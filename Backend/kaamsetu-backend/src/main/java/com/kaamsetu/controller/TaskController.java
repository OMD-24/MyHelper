package com.kaamsetu.controller;

import com.kaamsetu.dto.ApplicationRequest;
import com.kaamsetu.dto.ApplicationResponse;
import com.kaamsetu.dto.TaskRequest;
import com.kaamsetu.dto.TaskResponse;
import com.kaamsetu.entity.User;
import com.kaamsetu.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getAllTasks(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String urgency,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(taskService.getAllTasks(category, urgency, status, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getTaskById(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
            @Valid @RequestBody TaskRequest request,
            @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(taskService.createTask(request, currentUser));
    }

    @PostMapping("/{taskId}/apply")
    public ResponseEntity<ApplicationResponse> applyForTask(
            @PathVariable Long taskId,
            @RequestBody ApplicationRequest request,
            @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(taskService.applyForTask(taskId, request, currentUser));
    }

    @PutMapping("/{taskId}/applications/{applicationId}/accept")
    public ResponseEntity<TaskResponse> acceptApplication(
            @PathVariable Long taskId,
            @PathVariable Long applicationId,
            @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(
                taskService.acceptApplication(taskId, applicationId, currentUser));
    }

    @PutMapping("/{taskId}/complete")
    public ResponseEntity<TaskResponse> completeTask(
            @PathVariable Long taskId,
            @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(taskService.completeTask(taskId, currentUser));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TaskResponse>> getTasksByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(taskService.getTasksByUser(userId));
    }

    @GetMapping("/applied/{userId}")
    public ResponseEntity<List<TaskResponse>> getAppliedTasks(@PathVariable Long userId) {
        return ResponseEntity.ok(taskService.getAppliedTasks(userId));
    }
}