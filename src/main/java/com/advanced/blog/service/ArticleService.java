package com.advanced.blog.service;

import com.advanced.blog.domain.Article;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Article}.
 */
public interface ArticleService {

    /**
     * Save a article.
     *
     * @param article the entity to save.
     * @return the persisted entity.
     */
    Article save(Article article);

    /**
     * Get all the articles.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Article> findAll(Pageable pageable);

    /**
     * Get all the articles with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<Article> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" article.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Article> findOne(Long id);

    /**
     * Delete the "id" article.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
