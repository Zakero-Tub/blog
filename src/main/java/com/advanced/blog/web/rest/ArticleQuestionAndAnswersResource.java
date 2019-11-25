package com.advanced.blog.web.rest;

import com.advanced.blog.domain.ArticleQuestionAndAnswers;
import com.advanced.blog.service.ArticleQuestionAndAnswersService;
import com.advanced.blog.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.advanced.blog.domain.ArticleQuestionAndAnswers}.
 */
@RestController
@RequestMapping("/api")
public class ArticleQuestionAndAnswersResource {

    private final Logger log = LoggerFactory.getLogger(ArticleQuestionAndAnswersResource.class);

    private static final String ENTITY_NAME = "articleQuestionAndAnswers";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ArticleQuestionAndAnswersService articleQuestionAndAnswersService;

    public ArticleQuestionAndAnswersResource(ArticleQuestionAndAnswersService articleQuestionAndAnswersService) {
        this.articleQuestionAndAnswersService = articleQuestionAndAnswersService;
    }

    /**
     * {@code POST  /article-question-and-answers} : Create a new articleQuestionAndAnswers.
     *
     * @param articleQuestionAndAnswers the articleQuestionAndAnswers to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new articleQuestionAndAnswers, or with status {@code 400 (Bad Request)} if the articleQuestionAndAnswers has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/article-question-and-answers")
    public ResponseEntity<ArticleQuestionAndAnswers> createArticleQuestionAndAnswers(@RequestBody ArticleQuestionAndAnswers articleQuestionAndAnswers) throws URISyntaxException {
        log.debug("REST request to save ArticleQuestionAndAnswers : {}", articleQuestionAndAnswers);
        if (articleQuestionAndAnswers.getId() != null) {
            throw new BadRequestAlertException("A new articleQuestionAndAnswers cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ArticleQuestionAndAnswers result = articleQuestionAndAnswersService.save(articleQuestionAndAnswers);
        return ResponseEntity.created(new URI("/api/article-question-and-answers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /article-question-and-answers} : Updates an existing articleQuestionAndAnswers.
     *
     * @param articleQuestionAndAnswers the articleQuestionAndAnswers to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated articleQuestionAndAnswers,
     * or with status {@code 400 (Bad Request)} if the articleQuestionAndAnswers is not valid,
     * or with status {@code 500 (Internal Server Error)} if the articleQuestionAndAnswers couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/article-question-and-answers")
    public ResponseEntity<ArticleQuestionAndAnswers> updateArticleQuestionAndAnswers(@RequestBody ArticleQuestionAndAnswers articleQuestionAndAnswers) throws URISyntaxException {
        log.debug("REST request to update ArticleQuestionAndAnswers : {}", articleQuestionAndAnswers);
        if (articleQuestionAndAnswers.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ArticleQuestionAndAnswers result = articleQuestionAndAnswersService.save(articleQuestionAndAnswers);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, articleQuestionAndAnswers.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /article-question-and-answers} : get all the articleQuestionAndAnswers.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of articleQuestionAndAnswers in body.
     */
    @GetMapping("/article-question-and-answers")
    public ResponseEntity<List<ArticleQuestionAndAnswers>> getAllArticleQuestionAndAnswers(Pageable pageable) {
        log.debug("REST request to get a page of ArticleQuestionAndAnswers");
        Page<ArticleQuestionAndAnswers> page = articleQuestionAndAnswersService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /article-question-and-answers/:id} : get the "id" articleQuestionAndAnswers.
     *
     * @param id the id of the articleQuestionAndAnswers to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the articleQuestionAndAnswers, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/article-question-and-answers/{id}")
    public ResponseEntity<ArticleQuestionAndAnswers> getArticleQuestionAndAnswers(@PathVariable Long id) {
        log.debug("REST request to get ArticleQuestionAndAnswers : {}", id);
        Optional<ArticleQuestionAndAnswers> articleQuestionAndAnswers = articleQuestionAndAnswersService.findOne(id);
        return ResponseUtil.wrapOrNotFound(articleQuestionAndAnswers);
    }

    /**
     * {@code DELETE  /article-question-and-answers/:id} : delete the "id" articleQuestionAndAnswers.
     *
     * @param id the id of the articleQuestionAndAnswers to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/article-question-and-answers/{id}")
    public ResponseEntity<Void> deleteArticleQuestionAndAnswers(@PathVariable Long id) {
        log.debug("REST request to delete ArticleQuestionAndAnswers : {}", id);
        articleQuestionAndAnswersService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
