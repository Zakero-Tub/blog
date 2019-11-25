package com.advanced.blog.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Article.
 */
@Entity
@Table(name = "article")
public class Article implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "number_of_views")
    private Long numberOfViews;

    @Column(name = "date_created")
    private Instant dateCreated;

    @Column(name = "data_updated")
    private Instant dataUpdated;

    @ManyToOne
    @JsonIgnoreProperties("articles")
    private Media thumbnail;

    @ManyToOne
    @JsonIgnoreProperties("articles")
    private User createdBy;

    @ManyToMany
    @JoinTable(name = "article_gallery",
               joinColumns = @JoinColumn(name = "article_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "gallery_id", referencedColumnName = "id"))
    private Set<Media> galleries = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "article_tags",
               joinColumns = @JoinColumn(name = "article_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "tags_id", referencedColumnName = "id"))
    private Set<Tag> tags = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Article title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public Article content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getNumberOfViews() {
        return numberOfViews;
    }

    public Article numberOfViews(Long numberOfViews) {
        this.numberOfViews = numberOfViews;
        return this;
    }

    public void setNumberOfViews(Long numberOfViews) {
        this.numberOfViews = numberOfViews;
    }

    public Instant getDateCreated() {
        return dateCreated;
    }

    public Article dateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
        return this;
    }

    public void setDateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Instant getDataUpdated() {
        return dataUpdated;
    }

    public Article dataUpdated(Instant dataUpdated) {
        this.dataUpdated = dataUpdated;
        return this;
    }

    public void setDataUpdated(Instant dataUpdated) {
        this.dataUpdated = dataUpdated;
    }

    public Media getThumbnail() {
        return thumbnail;
    }

    public Article thumbnail(Media media) {
        this.thumbnail = media;
        return this;
    }

    public void setThumbnail(Media media) {
        this.thumbnail = media;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public Article createdBy(User user) {
        this.createdBy = user;
        return this;
    }

    public void setCreatedBy(User user) {
        this.createdBy = user;
    }

    public Set<Media> getGalleries() {
        return galleries;
    }

    public Article galleries(Set<Media> media) {
        this.galleries = media;
        return this;
    }

    public Article addGallery(Media media) {
        this.galleries.add(media);
        media.getArticles().add(this);
        return this;
    }

    public Article removeGallery(Media media) {
        this.galleries.remove(media);
        media.getArticles().remove(this);
        return this;
    }

    public void setGalleries(Set<Media> media) {
        this.galleries = media;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public Article tags(Set<Tag> tags) {
        this.tags = tags;
        return this;
    }

    public Article addTags(Tag tag) {
        this.tags.add(tag);
        tag.getArticles().add(this);
        return this;
    }

    public Article removeTags(Tag tag) {
        this.tags.remove(tag);
        tag.getArticles().remove(this);
        return this;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Article)) {
            return false;
        }
        return id != null && id.equals(((Article) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Article{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", content='" + getContent() + "'" +
            ", numberOfViews=" + getNumberOfViews() +
            ", dateCreated='" + getDateCreated() + "'" +
            ", dataUpdated='" + getDataUpdated() + "'" +
            "}";
    }
}
