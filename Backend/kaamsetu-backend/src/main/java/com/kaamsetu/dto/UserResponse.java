package com.kaamsetu.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String name;
    private String phone;
    private String role;
    private List<String> skills;
    private Double rating;
    private Integer tasksCompleted;
    private String createdAt;
}