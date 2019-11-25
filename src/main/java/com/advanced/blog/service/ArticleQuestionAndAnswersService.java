package com.advanced.blog.service;

import com.advanced.blog.domain.ArticleQuestionAndAnswers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link ArticleQuestionAndAnswers}.
 */
public interface ArticleQuestionAndAnswersService {

    /**
     * Save a articleQuestionAndAnswers.
     *
     * @param articleQuestionAndAnswers the entity to save.
     * @return the persisted entity.
     */
    ArticleQuestionAndAnswers save(ArticleQuestionAndAnswers articleQuestionAndAnswers);

    /**
     * Get all the articleQuestionAndAnswers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ArticleQuestionAndAnswers> findAll(Pageable pageable);


    /**
     * Get the "id" articleQuestionAndAnswers.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ArticleQuestionAndAnswers> findOne(Long id);

    /**
     * Delete the "id" articleQuestionAndAnswers.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
