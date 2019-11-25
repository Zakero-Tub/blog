package com.advanced.blog.service.impl;

import com.advanced.blog.service.ArticleQuestionAndAnswersService;
import com.advanced.blog.domain.ArticleQuestionAndAnswers;
import com.advanced.blog.repository.ArticleQuestionAndAnswersRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ArticleQuestionAndAnswers}.
 */
@Service
@Transactional
public class ArticleQuestionAndAnswersServiceImpl implements ArticleQuestionAndAnswersService {

    private final Logger log = LoggerFactory.getLogger(ArticleQuestionAndAnswersServiceImpl.class);

    private final ArticleQuestionAndAnswersRepository articleQuestionAndAnswersRepository;

    public ArticleQuestionAndAnswersServiceImpl(ArticleQuestionAndAnswersRepository articleQuestionAndAnswersRepository) {
        this.articleQuestionAndAnswersRepository = articleQuestionAndAnswersRepository;
    }

    /**
     * Save a articleQuestionAndAnswers.
     *
     * @param articleQuestionAndAnswers the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ArticleQuestionAndAnswers save(ArticleQuestionAndAnswers articleQuestionAndAnswers) {
        log.debug("Request to save ArticleQuestionAndAnswers : {}", articleQuestionAndAnswers);
        return articleQuestionAndAnswersRepository.save(articleQuestionAndAnswers);
    }

    /**
     * Get all the articleQuestionAndAnswers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ArticleQuestionAndAnswers> findAll(Pageable pageable) {
        log.debug("Request to get all ArticleQuestionAndAnswers");
        return articleQuestionAndAnswersRepository.findAll(pageable);
    }


    /**
     * Get one articleQuestionAndAnswers by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ArticleQuestionAndAnswers> findOne(Long id) {
        log.debug("Request to get ArticleQuestionAndAnswers : {}", id);
        return articleQuestionAndAnswersRepository.findById(id);
    }

    /**
     * Delete the articleQuestionAndAnswers by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ArticleQuestionAndAnswers : {}", id);
        articleQuestionAndAnswersRepository.deleteById(id);
    }
}
