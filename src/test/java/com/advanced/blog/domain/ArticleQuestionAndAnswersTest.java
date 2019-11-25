package com.advanced.blog.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.advanced.blog.web.rest.TestUtil;

public class ArticleQuestionAndAnswersTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ArticleQuestionAndAnswers.class);
        ArticleQuestionAndAnswers articleQuestionAndAnswers1 = new ArticleQuestionAndAnswers();
        articleQuestionAndAnswers1.setId(1L);
        ArticleQuestionAndAnswers articleQuestionAndAnswers2 = new ArticleQuestionAndAnswers();
        articleQuestionAndAnswers2.setId(articleQuestionAndAnswers1.getId());
        assertThat(articleQuestionAndAnswers1).isEqualTo(articleQuestionAndAnswers2);
        articleQuestionAndAnswers2.setId(2L);
        assertThat(articleQuestionAndAnswers1).isNotEqualTo(articleQuestionAndAnswers2);
        articleQuestionAndAnswers1.setId(null);
        assertThat(articleQuestionAndAnswers1).isNotEqualTo(articleQuestionAndAnswers2);
    }
}
