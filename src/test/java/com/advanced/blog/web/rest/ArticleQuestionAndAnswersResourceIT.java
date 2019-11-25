package com.advanced.blog.web.rest;

import com.advanced.blog.BlogApp;
import com.advanced.blog.domain.ArticleQuestionAndAnswers;
import com.advanced.blog.repository.ArticleQuestionAndAnswersRepository;
import com.advanced.blog.service.ArticleQuestionAndAnswersService;
import com.advanced.blog.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.advanced.blog.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ArticleQuestionAndAnswersResource} REST controller.
 */
@SpringBootTest(classes = BlogApp.class)
public class ArticleQuestionAndAnswersResourceIT {

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final Integer DEFAULT_VOTES = 1;
    private static final Integer UPDATED_VOTES = 2;

    private static final String DEFAULT_AUTHOR = "AAAAAAAAAA";
    private static final String UPDATED_AUTHOR = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_UPDATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_UPDATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ArticleQuestionAndAnswersRepository articleQuestionAndAnswersRepository;

    @Autowired
    private ArticleQuestionAndAnswersService articleQuestionAndAnswersService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restArticleQuestionAndAnswersMockMvc;

    private ArticleQuestionAndAnswers articleQuestionAndAnswers;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ArticleQuestionAndAnswersResource articleQuestionAndAnswersResource = new ArticleQuestionAndAnswersResource(articleQuestionAndAnswersService);
        this.restArticleQuestionAndAnswersMockMvc = MockMvcBuilders.standaloneSetup(articleQuestionAndAnswersResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ArticleQuestionAndAnswers createEntity(EntityManager em) {
        ArticleQuestionAndAnswers articleQuestionAndAnswers = new ArticleQuestionAndAnswers()
            .content(DEFAULT_CONTENT)
            .votes(DEFAULT_VOTES)
            .author(DEFAULT_AUTHOR)
            .email(DEFAULT_EMAIL)
            .dateCreated(DEFAULT_DATE_CREATED)
            .dateUpdated(DEFAULT_DATE_UPDATED);
        return articleQuestionAndAnswers;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ArticleQuestionAndAnswers createUpdatedEntity(EntityManager em) {
        ArticleQuestionAndAnswers articleQuestionAndAnswers = new ArticleQuestionAndAnswers()
            .content(UPDATED_CONTENT)
            .votes(UPDATED_VOTES)
            .author(UPDATED_AUTHOR)
            .email(UPDATED_EMAIL)
            .dateCreated(UPDATED_DATE_CREATED)
            .dateUpdated(UPDATED_DATE_UPDATED);
        return articleQuestionAndAnswers;
    }

    @BeforeEach
    public void initTest() {
        articleQuestionAndAnswers = createEntity(em);
    }

    @Test
    @Transactional
    public void createArticleQuestionAndAnswers() throws Exception {
        int databaseSizeBeforeCreate = articleQuestionAndAnswersRepository.findAll().size();

        // Create the ArticleQuestionAndAnswers
        restArticleQuestionAndAnswersMockMvc.perform(post("/api/article-question-and-answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleQuestionAndAnswers)))
            .andExpect(status().isCreated());

        // Validate the ArticleQuestionAndAnswers in the database
        List<ArticleQuestionAndAnswers> articleQuestionAndAnswersList = articleQuestionAndAnswersRepository.findAll();
        assertThat(articleQuestionAndAnswersList).hasSize(databaseSizeBeforeCreate + 1);
        ArticleQuestionAndAnswers testArticleQuestionAndAnswers = articleQuestionAndAnswersList.get(articleQuestionAndAnswersList.size() - 1);
        assertThat(testArticleQuestionAndAnswers.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testArticleQuestionAndAnswers.getVotes()).isEqualTo(DEFAULT_VOTES);
        assertThat(testArticleQuestionAndAnswers.getAuthor()).isEqualTo(DEFAULT_AUTHOR);
        assertThat(testArticleQuestionAndAnswers.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testArticleQuestionAndAnswers.getDateCreated()).isEqualTo(DEFAULT_DATE_CREATED);
        assertThat(testArticleQuestionAndAnswers.getDateUpdated()).isEqualTo(DEFAULT_DATE_UPDATED);
    }

    @Test
    @Transactional
    public void createArticleQuestionAndAnswersWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = articleQuestionAndAnswersRepository.findAll().size();

        // Create the ArticleQuestionAndAnswers with an existing ID
        articleQuestionAndAnswers.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restArticleQuestionAndAnswersMockMvc.perform(post("/api/article-question-and-answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleQuestionAndAnswers)))
            .andExpect(status().isBadRequest());

        // Validate the ArticleQuestionAndAnswers in the database
        List<ArticleQuestionAndAnswers> articleQuestionAndAnswersList = articleQuestionAndAnswersRepository.findAll();
        assertThat(articleQuestionAndAnswersList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllArticleQuestionAndAnswers() throws Exception {
        // Initialize the database
        articleQuestionAndAnswersRepository.saveAndFlush(articleQuestionAndAnswers);

        // Get all the articleQuestionAndAnswersList
        restArticleQuestionAndAnswersMockMvc.perform(get("/api/article-question-and-answers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(articleQuestionAndAnswers.getId().intValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)))
            .andExpect(jsonPath("$.[*].votes").value(hasItem(DEFAULT_VOTES)))
            .andExpect(jsonPath("$.[*].author").value(hasItem(DEFAULT_AUTHOR)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].dateCreated").value(hasItem(DEFAULT_DATE_CREATED.toString())))
            .andExpect(jsonPath("$.[*].dateUpdated").value(hasItem(DEFAULT_DATE_UPDATED.toString())));
    }
    
    @Test
    @Transactional
    public void getArticleQuestionAndAnswers() throws Exception {
        // Initialize the database
        articleQuestionAndAnswersRepository.saveAndFlush(articleQuestionAndAnswers);

        // Get the articleQuestionAndAnswers
        restArticleQuestionAndAnswersMockMvc.perform(get("/api/article-question-and-answers/{id}", articleQuestionAndAnswers.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(articleQuestionAndAnswers.getId().intValue()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT))
            .andExpect(jsonPath("$.votes").value(DEFAULT_VOTES))
            .andExpect(jsonPath("$.author").value(DEFAULT_AUTHOR))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.dateCreated").value(DEFAULT_DATE_CREATED.toString()))
            .andExpect(jsonPath("$.dateUpdated").value(DEFAULT_DATE_UPDATED.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingArticleQuestionAndAnswers() throws Exception {
        // Get the articleQuestionAndAnswers
        restArticleQuestionAndAnswersMockMvc.perform(get("/api/article-question-and-answers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateArticleQuestionAndAnswers() throws Exception {
        // Initialize the database
        articleQuestionAndAnswersService.save(articleQuestionAndAnswers);

        int databaseSizeBeforeUpdate = articleQuestionAndAnswersRepository.findAll().size();

        // Update the articleQuestionAndAnswers
        ArticleQuestionAndAnswers updatedArticleQuestionAndAnswers = articleQuestionAndAnswersRepository.findById(articleQuestionAndAnswers.getId()).get();
        // Disconnect from session so that the updates on updatedArticleQuestionAndAnswers are not directly saved in db
        em.detach(updatedArticleQuestionAndAnswers);
        updatedArticleQuestionAndAnswers
            .content(UPDATED_CONTENT)
            .votes(UPDATED_VOTES)
            .author(UPDATED_AUTHOR)
            .email(UPDATED_EMAIL)
            .dateCreated(UPDATED_DATE_CREATED)
            .dateUpdated(UPDATED_DATE_UPDATED);

        restArticleQuestionAndAnswersMockMvc.perform(put("/api/article-question-and-answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedArticleQuestionAndAnswers)))
            .andExpect(status().isOk());

        // Validate the ArticleQuestionAndAnswers in the database
        List<ArticleQuestionAndAnswers> articleQuestionAndAnswersList = articleQuestionAndAnswersRepository.findAll();
        assertThat(articleQuestionAndAnswersList).hasSize(databaseSizeBeforeUpdate);
        ArticleQuestionAndAnswers testArticleQuestionAndAnswers = articleQuestionAndAnswersList.get(articleQuestionAndAnswersList.size() - 1);
        assertThat(testArticleQuestionAndAnswers.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testArticleQuestionAndAnswers.getVotes()).isEqualTo(UPDATED_VOTES);
        assertThat(testArticleQuestionAndAnswers.getAuthor()).isEqualTo(UPDATED_AUTHOR);
        assertThat(testArticleQuestionAndAnswers.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testArticleQuestionAndAnswers.getDateCreated()).isEqualTo(UPDATED_DATE_CREATED);
        assertThat(testArticleQuestionAndAnswers.getDateUpdated()).isEqualTo(UPDATED_DATE_UPDATED);
    }

    @Test
    @Transactional
    public void updateNonExistingArticleQuestionAndAnswers() throws Exception {
        int databaseSizeBeforeUpdate = articleQuestionAndAnswersRepository.findAll().size();

        // Create the ArticleQuestionAndAnswers

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArticleQuestionAndAnswersMockMvc.perform(put("/api/article-question-and-answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleQuestionAndAnswers)))
            .andExpect(status().isBadRequest());

        // Validate the ArticleQuestionAndAnswers in the database
        List<ArticleQuestionAndAnswers> articleQuestionAndAnswersList = articleQuestionAndAnswersRepository.findAll();
        assertThat(articleQuestionAndAnswersList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteArticleQuestionAndAnswers() throws Exception {
        // Initialize the database
        articleQuestionAndAnswersService.save(articleQuestionAndAnswers);

        int databaseSizeBeforeDelete = articleQuestionAndAnswersRepository.findAll().size();

        // Delete the articleQuestionAndAnswers
        restArticleQuestionAndAnswersMockMvc.perform(delete("/api/article-question-and-answers/{id}", articleQuestionAndAnswers.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ArticleQuestionAndAnswers> articleQuestionAndAnswersList = articleQuestionAndAnswersRepository.findAll();
        assertThat(articleQuestionAndAnswersList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
