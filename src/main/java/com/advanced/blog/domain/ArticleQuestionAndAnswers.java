package com.advanced.blog.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A ArticleQuestionAndAnswers.
 */
@Entity
@Table(name = "article_question_and_answers")
public class ArticleQuestionAndAnswers implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "content")
    private String content;

    @Column(name = "votes")
    private Integer votes;

    @Column(name = "author")
    private String author;

    @Column(name = "email")
    private String email;

    @Column(name = "date_created")
    private Instant dateCreated;

    @Column(name = "date_updated")
    private Instant dateUpdated;

    @ManyToOne
    @JsonIgnoreProperties("articleQuestionAndAnswers")
    private Article article;

    @ManyToOne
    @JsonIgnoreProperties("articleQuestionAndAnswers")
    private ArticleQuestionAndAnswers answer;

    @ManyToOne
    @JsonIgnoreProperties("articleQuestionAndAnswers")
    private User createdBy;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public ArticleQuestionAndAnswers content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getVotes() {
        return votes;
    }

    public ArticleQuestionAndAnswers votes(Integer votes) {
        this.votes = votes;
        return this;
    }

    public void setVotes(Integer votes) {
        this.votes = votes;
    }

    public String getAuthor() {
        return author;
    }

    public ArticleQuestionAndAnswers author(String author) {
        this.author = author;
        return this;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getEmail() {
        return email;
    }

    public ArticleQuestionAndAnswers email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Instant getDateCreated() {
        return dateCreated;
    }

    public ArticleQuestionAndAnswers dateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
        return this;
    }

    public void setDateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Instant getDateUpdated() {
        return dateUpdated;
    }

    public ArticleQuestionAndAnswers dateUpdated(Instant dateUpdated) {
        this.dateUpdated = dateUpdated;
        return this;
    }

    public void setDateUpdated(Instant dateUpdated) {
        this.dateUpdated = dateUpdated;
    }

    public Article getArticle() {
        return article;
    }

    public ArticleQuestionAndAnswers article(Article article) {
        this.article = article;
        return this;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public ArticleQuestionAndAnswers getAnswer() {
        return answer;
    }

    public ArticleQuestionAndAnswers answer(ArticleQuestionAndAnswers articleQuestionAndAnswers) {
        this.answer = articleQuestionAndAnswers;
        return this;
    }

    public void setAnswer(ArticleQuestionAndAnswers articleQuestionAndAnswers) {
        this.answer = articleQuestionAndAnswers;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public ArticleQuestionAndAnswers createdBy(User user) {
        this.createdBy = user;
        return this;
    }

    public void setCreatedBy(User user) {
        this.createdBy = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ArticleQuestionAndAnswers)) {
            return false;
        }
        return id != null && id.equals(((ArticleQuestionAndAnswers) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ArticleQuestionAndAnswers{" +
            "id=" + getId() +
            ", content='" + getContent() + "'" +
            ", votes=" + getVotes() +
            ", author='" + getAuthor() + "'" +
            ", email='" + getEmail() + "'" +
            ", dateCreated='" + getDateCreated() + "'" +
            ", dateUpdated='" + getDateUpdated() + "'" +
            "}";
    }
}
