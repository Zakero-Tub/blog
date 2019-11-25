import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './review.reducer';
import { IReview } from 'app/shared/model/review.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReviewDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ReviewDetail extends React.Component<IReviewDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { reviewEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Review [<b>{reviewEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="content">Content</span>
            </dt>
            <dd>{reviewEntity.content}</dd>
            <dt>
              <span id="rating">Rating</span>
            </dt>
            <dd>{reviewEntity.rating}</dd>
            <dt>
              <span id="votes">Votes</span>
            </dt>
            <dd>{reviewEntity.votes}</dd>
            <dt>
              <span id="author">Author</span>
            </dt>
            <dd>{reviewEntity.author}</dd>
            <dt>
              <span id="dateCreated">Date Created</span>
            </dt>
            <dd>
              <TextFormat value={reviewEntity.dateCreated} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="dateUpdated">Date Updated</span>
            </dt>
            <dd>
              <TextFormat value={reviewEntity.dateUpdated} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>Article</dt>
            <dd>{reviewEntity.article ? reviewEntity.article.id : ''}</dd>
            <dt>Created By</dt>
            <dd>{reviewEntity.createdBy ? reviewEntity.createdBy.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/review" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/review/${reviewEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ review }: IRootState) => ({
  reviewEntity: review.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewDetail);
