package com.advanced.blog.repository;
import com.advanced.blog.domain.ArticleQuestionAndAnswers;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the ArticleQuestionAndAnswers entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArticleQuestionAndAnswersRepository extends JpaRepository<ArticleQuestionAndAnswers, Long> {

    @Query("select articleQuestionAndAnswers from ArticleQuestionAndAnswers articleQuestionAndAnswers where articleQuestionAndAnswers.createdBy.login = ?#{principal.username}")
    List<ArticleQuestionAndAnswers> findByCreatedByIsCurrentUser();

}
