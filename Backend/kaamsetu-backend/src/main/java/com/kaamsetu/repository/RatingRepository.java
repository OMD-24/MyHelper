package com.kaamsetu.repository;

import com.kaamsetu.entity.Rating;
import com.kaamsetu.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByGivenTo(User user);

    @Query("SELECT AVG(r.stars) FROM Rating r WHERE r.givenTo = :user")
    Double findAverageRatingByUser(@Param("user") User user);
}