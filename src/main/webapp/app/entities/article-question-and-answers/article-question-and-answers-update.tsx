import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IArticle } from 'app/shared/model/article.model';
import { getEntities as getArticles } from 'app/entities/article/article.reducer';
import { getEntities as getArticleQuestionAndAnswers } from 'app/entities/article-question-and-answers/article-question-and-answers.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './article-question-and-answers.reducer';
import { IArticleQuestionAndAnswers } from 'app/shared/model/article-question-and-answers.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IArticleQuestionAndAnswersUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IArticleQuestionAndAnswersUpdateState {
  isNew: boolean;
  articleId: string;
  answerId: string;
  createdById: string;
}

export class ArticleQuestionAndAnswersUpdate extends React.Component<
  IArticleQuestionAndAnswersUpdateProps,
  IArticleQuestionAndAnswersUpdateState
> {
  constructor(props) {
    super(props);
    this.state = {
      articleId: '0',
      answerId: '0',
      createdById: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getArticles();
    this.props.getArticleQuestionAndAnswers();
    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    values.dateCreated = convertDateTimeToServer(values.dateCreated);
    values.dateUpdated = convertDateTimeToServer(values.dateUpdated);

    if (errors.length === 0) {
      const { articleQuestionAndAnswersEntity } = this.props;
      const entity = {
        ...articleQuestionAndAnswersEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/article-question-and-answers');
  };

  render() {
    const { articleQuestionAndAnswersEntity, articles, articleQuestionAndAnswers, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="blogApp.articleQuestionAndAnswers.home.createOrEditLabel">Create or edit a ArticleQuestionAndAnswers</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : articleQuestionAndAnswersEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="article-question-and-answers-id">ID</Label>
                    <AvInput id="article-question-and-answers-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="contentLabel" for="article-question-and-answers-content">
                    Content
                  </Label>
                  <AvField id="article-question-and-answers-content" type="text" name="content" />
                </AvGroup>
                <AvGroup>
                  <Label id="votesLabel" for="article-question-and-answers-votes">
                    Votes
                  </Label>
                  <AvField id="article-question-and-answers-votes" type="string" className="form-control" name="votes" />
                </AvGroup>
                <AvGroup>
                  <Label id="authorLabel" for="article-question-and-answers-author">
                    Author
                  </Label>
                  <AvField id="article-question-and-answers-author" type="text" name="author" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="article-question-and-answers-email">
                    Email
                  </Label>
                  <AvField id="article-question-and-answers-email" type="text" name="email" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateCreatedLabel" for="article-question-and-answers-dateCreated">
                    Date Created
                  </Label>
                  <AvInput
                    id="article-question-and-answers-dateCreated"
                    type="datetime-local"
                    className="form-control"
                    name="dateCreated"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.articleQuestionAndAnswersEntity.dateCreated)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dateUpdatedLabel" for="article-question-and-answers-dateUpdated">
                    Date Updated
                  </Label>
                  <AvInput
                    id="article-question-and-answers-dateUpdated"
                    type="datetime-local"
                    className="form-control"
                    name="dateUpdated"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.articleQuestionAndAnswersEntity.dateUpdated)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="article-question-and-answers-article">Article</Label>
                  <AvInput id="article-question-and-answers-article" type="select" className="form-control" name="article.id">
                    <option value="" key="0" />
                    {articles
                      ? articles.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="article-question-and-answers-answer">Answer</Label>
                  <AvInput id="article-question-and-answers-answer" type="select" className="form-control" name="answer.id">
                    <option value="" key="0" />
                    {articleQuestionAndAnswers
                      ? articleQuestionAndAnswers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="article-question-and-answers-createdBy">Created By</Label>
                  <AvInput id="article-question-and-answers-createdBy" type="select" className="form-control" name="createdBy.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/article-question-and-answers" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  articles: storeState.article.entities,
  articleQuestionAndAnswers: storeState.articleQuestionAndAnswers.entities,
  users: storeState.userManagement.users,
  articleQuestionAndAnswersEntity: storeState.articleQuestionAndAnswers.entity,
  loading: storeState.articleQuestionAndAnswers.loading,
  updating: storeState.articleQuestionAndAnswers.updating,
  updateSuccess: storeState.articleQuestionAndAnswers.updateSuccess
});

const mapDispatchToProps = {
  getArticles,
  getArticleQuestionAndAnswers,
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleQuestionAndAnswersUpdate);
