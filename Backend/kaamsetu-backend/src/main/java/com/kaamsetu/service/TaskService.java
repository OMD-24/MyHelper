package com.kaamsetu.service;

import com.kaamsetu.dto.*;
import com.kaamsetu.entity.Application;
import com.kaamsetu.entity.Location;
import com.kaamsetu.entity.Task;
import com.kaamsetu.entity.User;
import com.kaamsetu.enums.ApplicationStatus;
import com.kaamsetu.enums.TaskStatus;
import com.kaamsetu.enums.UrgencyLevel;
import com.kaamsetu.exception.BadRequestException;
import com.kaamsetu.exception.ResourceNotFoundException;
import com.kaamsetu.repository.ApplicationRepository;
import com.kaamsetu.repository.TaskRepository;
import com.kaamsetu.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    // ─── Get All Tasks (with filters) ───

    public List<TaskResponse> getAllTasks(String category, String urgency,
                                          String status, String search) {
        List<Task> tasks = taskRepository.findAllByOrderByCreatedAtDesc();

        return tasks.stream()
                .filter(t -> category == null || category.isEmpty()
                        || t.getCategory().equalsIgnoreCase(category))
                .filter(t -> urgency == null || urgency.isEmpty()
                        || t.getUrgency().name().equalsIgnoreCase(urgency))
                .filter(t -> status == null || status.isEmpty()
                        || t.getStatus().name().equalsIgnoreCase(status))
                .filter(t -> search == null || search.isEmpty()
                        || t.getTitle().toLowerCase().contains(search.toLowerCase())
                        || t.getDescription().toLowerCase().contains(search.toLowerCase()))
                .map(this::toTaskResponse)
                .collect(Collectors.toList());
    }

    // ─── Get Task By ID ───

    @Transactional(readOnly = true)
    public TaskResponse getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
        return toTaskResponse(task);
    }

    // ─── Create Task ───

    public TaskResponse createTask(TaskRequest request, User currentUser) {
        UrgencyLevel urgency;
        try {
            urgency = UrgencyLevel.valueOf(request.getUrgency().toUpperCase());
        } catch (Exception e) {
            urgency = UrgencyLevel.NORMAL;
        }

        Location location = null;
        if (request.getLocation() != null) {
            location = new Location(
                    request.getLocation().getLat(),
                    request.getLocation().getLng(),
                    request.getLocation().getAddress()
            );
        }

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .budget(request.getBudget())
                .urgency(urgency)
                .status(TaskStatus.OPEN)
                .location(location)
                .createdBy(currentUser)
                .build();

        task = taskRepository.save(task);
        return toTaskResponse(task);
    }

    // ─── Apply for Task ───

    public ApplicationResponse applyForTask(Long taskId, ApplicationRequest request,
                                            User worker) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        if (task.getStatus() != TaskStatus.OPEN) {
            throw new BadRequestException("Task is no longer open for applications");
        }

        if (task.getCreatedBy().getId().equals(worker.getId())) {
            throw new BadRequestException("You cannot apply for your own task");
        }

        if (applicationRepository.existsByTaskAndWorker(task, worker)) {
            throw new BadRequestException("You have already applied for this task");
        }

        Application application = Application.builder()
                .task(task)
                .worker(worker)
                .message(request.getMessage())
                .proposedBudget(request.getProposedBudget() != null
                        ? request.getProposedBudget() : task.getBudget())
                .status(ApplicationStatus.PENDING)
                .build();

        application = applicationRepository.save(application);
        return toApplicationResponse(application);
    }

    // ─── Accept Application ───

    @Transactional
    public TaskResponse acceptApplication(Long taskId, Long applicationId, User currentUser) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        if (!task.getCreatedBy().getId().equals(currentUser.getId())) {
            throw new BadRequestException("Only the task owner can accept applications");
        }

        if (task.getStatus() != TaskStatus.OPEN) {
            throw new BadRequestException("Task is no longer open");
        }

        Application accepted = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        if (!accepted.getTask().getId().equals(taskId)) {
            throw new BadRequestException("Application does not belong to this task");
        }

        // Accept this application
        accepted.setStatus(ApplicationStatus.ACCEPTED);
        applicationRepository.save(accepted);

        // Reject all others
        List<Application> others = applicationRepository.findByTask(task);
        for (Application app : others) {
            if (!app.getId().equals(applicationId)) {
                app.setStatus(ApplicationStatus.REJECTED);
                applicationRepository.save(app);
            }
        }

        // Update task
        task.setStatus(TaskStatus.ACCEPTED);
        task.setAcceptedWorker(accepted.getWorker());
        task = taskRepository.save(task);

        return toTaskResponse(task);
    }

    // ─── Complete Task ───

    @Transactional
    public TaskResponse completeTask(Long taskId, User currentUser) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        if (!task.getCreatedBy().getId().equals(currentUser.getId())) {
            throw new BadRequestException("Only the task owner can complete it");
        }

        if (task.getStatus() != TaskStatus.ACCEPTED) {
            throw new BadRequestException("Task must be in ACCEPTED status to complete");
        }

        task.setStatus(TaskStatus.COMPLETED);
        task = taskRepository.save(task);

        // Increment worker's completed count
        User worker = task.getAcceptedWorker();
        if (worker != null) {
            worker.setTasksCompleted(worker.getTasksCompleted() + 1);
            userRepository.save(worker);
        }

        return toTaskResponse(task);
    }

    // ─── Get Tasks by User (posted) ───

    public List<TaskResponse> getTasksByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return taskRepository.findByCreatedByOrderByCreatedAtDesc(user)
                .stream()
                .map(this::toTaskResponse)
                .collect(Collectors.toList());
    }

    // ─── Get Applied Tasks ───

    public List<TaskResponse> getAppliedTasks(Long userId) {
        User worker = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Application> applications = applicationRepository.findByWorker(worker);
        return applications.stream()
                .map(app -> toTaskResponse(app.getTask()))
                .distinct()
                .collect(Collectors.toList());
    }

    // ─── Mappers ───

    private TaskResponse toTaskResponse(Task task) {
        List<Application> applications = applicationRepository.findByTaskId(task.getId());

        LocationDto locationDto = null;
        if (task.getLocation() != null) {
            locationDto = new LocationDto(
                    task.getLocation().getLat(),
                    task.getLocation().getLng(),
                    task.getLocation().getAddress()
            );
        }

        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .category(task.getCategory())
                .budget(task.getBudget())
                .urgency(task.getUrgency().name())
                .status(task.getStatus().name())
                .location(locationDto)
                .createdBy(task.getCreatedBy().getId())
                .createdByName(task.getCreatedBy().getName())
                .createdAt(task.getCreatedAt() != null ? task.getCreatedAt().toString() : null)
                .applications(applications.stream()
                        .map(this::toApplicationResponse)
                        .collect(Collectors.toList()))
                .acceptedWorker(task.getAcceptedWorker() != null
                        ? task.getAcceptedWorker().getId() : null)
                .build();
    }

    private ApplicationResponse toApplicationResponse(Application app) {
        return ApplicationResponse.builder()
                .id(app.getId())
                .workerId(app.getWorker().getId())
                .workerName(app.getWorker().getName())
                .workerRating(app.getWorker().getRating())
                .message(app.getMessage())
                .proposedBudget(app.getProposedBudget())
                .status(app.getStatus().name())
                .appliedAt(app.getAppliedAt() != null ? app.getAppliedAt().toString() : null)
                .build();
    }
}