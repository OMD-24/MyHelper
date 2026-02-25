package com.kaamsetu.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApplicationResponse {
    private Long id;
    private Long workerId;
    private String workerName;
    private Double workerRating;
    private String message;
    private Integer proposedBudget;
    private String status;
    private String appliedAt;
}