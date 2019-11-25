import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './article-question-and-answers.reducer';
import { IArticleQuestionAndAnswers } from 'app/shared/model/article-question-and-answers.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IArticleQuestionAndAnswersDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ArticleQuestionAndAnswersDetail extends React.Component<IArticleQuestionAndAnswersDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { articleQuestionAndAnswersEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            ArticleQuestionAndAnswers [<b>{articleQuestionAndAnswersEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="content">Content</span>
            </dt>
            <dd>{articleQuestionAndAnswersEntity.content}</dd>
            <dt>
              <span id="votes">Votes</span>
            </dt>
            <dd>{articleQuestionAndAnswersEntity.votes}</dd>
            <dt>
              <span id="author">Author</span>
            </dt>
            <dd>{articleQuestionAndAnswersEntity.author}</dd>
            <dt>
              <span id="email">Email</span>
            </dt>
            <dd>{articleQuestionAndAnswersEntity.email}</dd>
            <dt>
              <span id="dateCreated">Date Created</span>
            </dt>
            <dd>
              <TextFormat value={articleQuestionAndAnswersEntity.dateCreated} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="dateUpdated">Date Updated</span>
            </dt>
            <dd>
              <TextFormat value={articleQuestionAndAnswersEntity.dateUpdated} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>Article</dt>
            <dd>{articleQuestionAndAnswersEntity.article ? articleQuestionAndAnswersEntity.article.id : ''}</dd>
            <dt>Answer</dt>
            <dd>{articleQuestionAndAnswersEntity.answer ? articleQuestionAndAnswersEntity.answer.id : ''}</dd>
            <dt>Created By</dt>
            <dd>{articleQuestionAndAnswersEntity.createdBy ? articleQuestionAndAnswersEntity.createdBy.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/article-question-and-answers" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/article-question-and-answers/${articleQuestionAndAnswersEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ articleQuestionAndAnswers }: IRootState) => ({
  articleQuestionAndAnswersEntity: articleQuestionAndAnswers.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleQuestionAndAnswersDetail);
