package com.kaamsetu.repository;

import com.kaamsetu.entity.Task;
import com.kaamsetu.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByOrderByCreatedAtDesc();
    List<Task> findByCreatedByOrderByCreatedAtDesc(User createdBy);
}