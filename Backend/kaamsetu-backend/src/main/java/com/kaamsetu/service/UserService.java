package com.kaamsetu.service;

import com.kaamsetu.dto.UserResponse;
import com.kaamsetu.entity.User;
import com.kaamsetu.exception.ResourceNotFoundException;
import com.kaamsetu.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .phone(user.getPhone())
                .role(user.getRole().name())
                .skills(user.getSkills())
                .rating(user.getRating())
                .tasksCompleted(user.getTasksCompleted())
                .createdAt(user.getCreatedAt() != null ? user.getCreatedAt().toString() : null)
                .build();
    }
}