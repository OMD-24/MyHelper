package com.kaamsetu.repository;

import com.kaamsetu.entity.Application;
import com.kaamsetu.entity.Task;
import com.kaamsetu.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByTask(Task task);
    List<Application> findByWorker(User worker);
    boolean existsByTaskAndWorker(Task task, User worker);
    List<Application> findByTaskId(Long taskId);
}