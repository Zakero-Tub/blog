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
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './review.reducer';
import { IReview } from 'app/shared/model/review.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IReviewUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IReviewUpdateState {
  isNew: boolean;
  articleId: string;
  createdById: string;
}

export class ReviewUpdate extends React.Component<IReviewUpdateProps, IReviewUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      articleId: '0',
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
    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    values.dateCreated = convertDateTimeToServer(values.dateCreated);
    values.dateUpdated = convertDateTimeToServer(values.dateUpdated);

    if (errors.length === 0) {
      const { reviewEntity } = this.props;
      const entity = {
        ...reviewEntity,
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
    this.props.history.push('/review');
  };

  render() {
    const { reviewEntity, articles, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="blogApp.review.home.createOrEditLabel">Create or edit a Review</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : reviewEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="review-id">ID</Label>
                    <AvInput id="review-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="contentLabel" for="review-content">
                    Content
                  </Label>
                  <AvField id="review-content" type="text" name="content" />
                </AvGroup>
                <AvGroup>
                  <Label id="ratingLabel" for="review-rating">
                    Rating
                  </Label>
                  <AvField id="review-rating" type="string" className="form-control" name="rating" />
                </AvGroup>
                <AvGroup>
                  <Label id="votesLabel" for="review-votes">
                    Votes
                  </Label>
                  <AvField id="review-votes" type="string" className="form-control" name="votes" />
                </AvGroup>
                <AvGroup>
                  <Label id="authorLabel" for="review-author">
                    Author
                  </Label>
                  <AvField id="review-author" type="text" name="author" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateCreatedLabel" for="review-dateCreated">
                    Date Created
                  </Label>
                  <AvInput
                    id="review-dateCreated"
                    type="datetime-local"
                    className="form-control"
                    name="dateCreated"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.reviewEntity.dateCreated)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dateUpdatedLabel" for="review-dateUpdated">
                    Date Updated
                  </Label>
                  <AvInput
                    id="review-dateUpdated"
                    type="datetime-local"
                    className="form-control"
                    name="dateUpdated"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.reviewEntity.dateUpdated)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="review-article">Article</Label>
                  <AvInput id="review-article" type="select" className="form-control" name="article.id">
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
                  <Label for="review-createdBy">Created By</Label>
                  <AvInput id="review-createdBy" type="select" className="form-control" name="createdBy.id">
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
                <Button tag={Link} id="cancel-save" to="/review" replace color="info">
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
  users: storeState.userManagement.users,
  reviewEntity: storeState.review.entity,
  loading: storeState.review.loading,
  updating: storeState.review.updating,
  updateSuccess: storeState.review.updateSuccess
});

const mapDispatchToProps = {
  getArticles,
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
)(ReviewUpdate);
