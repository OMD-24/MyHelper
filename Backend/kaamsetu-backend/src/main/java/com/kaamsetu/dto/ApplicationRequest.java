package com.kaamsetu.dto;

import lombok.Data;

@Data
public class ApplicationRequest {
    private String message;
    private Integer proposedBudget;
}