package com.advanced.blog.repository;
import com.advanced.blog.domain.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Article entity.
 */
@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    @Query("select article from Article article where article.createdBy.login = ?#{principal.username}")
    List<Article> findByCreatedByIsCurrentUser();

    @Query(value = "select distinct article from Article article left join fetch article.galleries left join fetch article.tags",
        countQuery = "select count(distinct article) from Article article")
    Page<Article> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct article from Article article left join fetch article.galleries left join fetch article.tags")
    List<Article> findAllWithEagerRelationships();

    @Query("select article from Article article left join fetch article.galleries left join fetch article.tags where article.id =:id")
    Optional<Article> findOneWithEagerRelationships(@Param("id") Long id);

}
