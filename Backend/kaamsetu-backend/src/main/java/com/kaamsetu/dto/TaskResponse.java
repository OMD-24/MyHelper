package com.kaamsetu.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class TaskResponse {
    private Long id;
    private String title;
    private String description;
    private String category;
    private Integer budget;
    private String urgency;
    private String status;
    private LocationDto location;
    private Long createdBy;
    private String createdByName;
    private String createdAt;
    private List<ApplicationResponse> applications;
    private Long acceptedWorker;
}