package com.advanced.blog.repository;
import com.advanced.blog.domain.Review;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Review entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("select review from Review review where review.createdBy.login = ?#{principal.username}")
    List<Review> findByCreatedByIsCurrentUser();

}
