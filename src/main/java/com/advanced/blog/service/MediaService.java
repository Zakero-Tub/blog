package com.advanced.blog.service;

import com.advanced.blog.domain.Media;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Media}.
 */
public interface MediaService {

    /**
     * Save a media.
     *
     * @param media the entity to save.
     * @return the persisted entity.
     */
    Media save(Media media);

    /**
     * Get all the media.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Media> findAll(Pageable pageable);


    /**
     * Get the "id" media.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Media> findOne(Long id);

    /**
     * Delete the "id" media.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
