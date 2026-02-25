package com.kaamsetu.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TaskRequest {
    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Category is required")
    private String category;

    @NotNull(message = "Budget is required")
    @Min(value = 1, message = "Budget must be positive")
    private Integer budget;

    private String urgency = "NORMAL";

    private LocationDto location;
}