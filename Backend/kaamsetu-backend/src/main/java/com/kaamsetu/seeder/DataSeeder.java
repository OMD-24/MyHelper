package com.kaamsetu.seeder;

import com.kaamsetu.entity.Application;
import com.kaamsetu.entity.Location;
import com.kaamsetu.entity.Task;
import com.kaamsetu.entity.User;
import com.kaamsetu.enums.ApplicationStatus;
import com.kaamsetu.enums.Role;
import com.kaamsetu.enums.TaskStatus;
import com.kaamsetu.enums.UrgencyLevel;
import com.kaamsetu.repository.ApplicationRepository;
import com.kaamsetu.repository.TaskRepository;
import com.kaamsetu.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final ApplicationRepository applicationRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        if (userRepository.count() > 0) {
            log.info("Database already has data. Skipping seed.");
            return;
        }

        log.info("Seeding database with demo data...");

        // ─── Users ───

        User worker1 = userRepository.save(User.builder()
                .name("Rajesh Kumar")
                .phone("9876543210")
                .password(passwordEncoder.encode("password"))
                .role(Role.WORKER)
                .skills(List.of("plumbing", "electrical"))
                .rating(4.5)
                .tasksCompleted(23)
                .latitude(28.6139)
                .longitude(77.2090)
                .build());

        User seeker1 = userRepository.save(User.builder()
                .name("Priya Sharma")
                .phone("9876543211")
                .password(passwordEncoder.encode("password"))
                .role(Role.SEEKER)
                .skills(List.of())
                .rating(4.8)
                .tasksCompleted(0)
                .latitude(28.6129)
                .longitude(77.2295)
                .build());

        User worker2 = userRepository.save(User.builder()
                .name("Amit Singh")
                .phone("9876543212")
                .password(passwordEncoder.encode("password"))
                .role(Role.WORKER)
                .skills(List.of("electrical", "tech"))
                .rating(4.2)
                .tasksCompleted(15)
                .latitude(28.6339)
                .longitude(77.2190)
                .build());

        User seeker2 = userRepository.save(User.builder()
                .name("Sunita Devi")
                .phone("9876543213")
                .password(passwordEncoder.encode("password"))
                .role(Role.SEEKER)
                .skills(List.of())
                .rating(4.9)
                .tasksCompleted(0)
                .latitude(28.6239)
                .longitude(77.1990)
                .build());

        User worker3 = userRepository.save(User.builder()
                .name("Vikram Patel")
                .phone("9876543214")
                .password(passwordEncoder.encode("password"))
                .role(Role.WORKER)
                .skills(List.of("shifting", "cleaning", "gardening"))
                .rating(4.0)
                .tasksCompleted(31)
                .latitude(28.6039)
                .longitude(77.2390)
                .build());

        // ─── Tasks ───

        Task task1 = taskRepository.save(Task.builder()
                .title("Kitchen tap leaking badly")
                .description("My kitchen tap has been leaking for 2 days. Need an experienced plumber to fix it. Tools will be provided if needed.")
                .category("plumbing")
                .budget(300)
                .urgency(UrgencyLevel.URGENT)
                .status(TaskStatus.OPEN)
                .location(new Location(28.6129, 77.2295, "Connaught Place, Delhi"))
                .createdBy(seeker1)
                .build());

        Task task2 = taskRepository.save(Task.builder()
                .title("Medicine pickup from Apollo Pharmacy")
                .description("Need someone to pick up my mother's medicines from Apollo Pharmacy in Lajpat Nagar and deliver to my home.")
                .category("medical")
                .budget(100)
                .urgency(UrgencyLevel.EMERGENCY)
                .status(TaskStatus.OPEN)
                .location(new Location(28.5672, 77.2373, "Lajpat Nagar, Delhi"))
                .createdBy(seeker2)
                .build());

        Task task3 = taskRepository.save(Task.builder()
                .title("House deep cleaning - 2BHK")
                .description("Need thorough cleaning of my 2BHK flat. Including kitchen, bathrooms, balcony.")
                .category("cleaning")
                .budget(800)
                .urgency(UrgencyLevel.NORMAL)
                .status(TaskStatus.OPEN)
                .location(new Location(28.6339, 77.2190, "Karol Bagh, Delhi"))
                .createdBy(seeker1)
                .build());

        Task task4 = taskRepository.save(Task.builder()
                .title("Ceiling fan not working")
                .description("Living room ceiling fan stopped working suddenly. Making a humming noise.")
                .category("electrical")
                .budget(400)
                .urgency(UrgencyLevel.URGENT)
                .status(TaskStatus.OPEN)
                .location(new Location(28.6239, 77.1990, "Rajouri Garden, Delhi"))
                .createdBy(seeker2)
                .build());

        Task task5 = taskRepository.save(Task.builder()
                .title("Help moving sofa to 3rd floor")
                .description("Need 2-3 people to help move a large sofa from ground floor to 3rd floor. No lift.")
                .category("shifting")
                .budget(600)
                .urgency(UrgencyLevel.NORMAL)
                .status(TaskStatus.OPEN)
                .location(new Location(28.5921, 77.0462, "Dwarka, Delhi"))
                .createdBy(seeker1)
                .build());

        Task task6 = taskRepository.save(Task.builder()
                .title("Math tutor for class 10 board exam")
                .description("Looking for a math tutor for my son. Class 10 CBSE. 2 hours daily for 2 weeks.")
                .category("teaching")
                .budget(200)
                .urgency(UrgencyLevel.NORMAL)
                .status(TaskStatus.OPEN)
                .location(new Location(28.6508, 77.2335, "Civil Lines, Delhi"))
                .createdBy(seeker2)
                .build());

        Task task7 = taskRepository.save(Task.builder()
                .title("Laptop screen flickering")
                .description("HP laptop screen is flickering badly. Sometimes goes black. Need diagnosis and fix.")
                .category("tech")
                .budget(500)
                .urgency(UrgencyLevel.URGENT)
                .status(TaskStatus.OPEN)
                .location(new Location(28.6304, 77.2177, "Paharganj, Delhi"))
                .createdBy(seeker2)
                .build());

        // ─── Applications ───

        applicationRepository.save(Application.builder()
                .task(task1)
                .worker(worker1)
                .message("I can fix this in 30 minutes. Have 5 years experience in plumbing.")
                .proposedBudget(250)
                .status(ApplicationStatus.PENDING)
                .build());

        applicationRepository.save(Application.builder()
                .task(task3)
                .worker(worker3)
                .message("I do professional cleaning. Can come tomorrow morning.")
                .proposedBudget(700)
                .status(ApplicationStatus.PENDING)
                .build());

        applicationRepository.save(Application.builder()
                .task(task7)
                .worker(worker2)
                .message("I repair laptops regularly. Could be a display cable issue.")
                .proposedBudget(450)
                .status(ApplicationStatus.PENDING)
                .build());

        log.info("✅ Database seeded successfully!");
        log.info("Demo logins:");
        log.info("  Worker  → phone: 9876543210  password: password");
        log.info("  Seeker  → phone: 9876543211  password: password");
    }
}