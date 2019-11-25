import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, reset } from './review.reducer';
import { IReview } from 'app/shared/model/review.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IReviewProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IReviewState = IPaginationBaseState;

export class Review extends React.Component<IReviewProps, IReviewState> {
  state: IReviewState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.reset();
  }

  componentDidUpdate() {
    if (this.props.updateSuccess) {
      this.reset();
    }
  }

  reset = () => {
    this.props.reset();
    this.setState({ activePage: 1 }, () => {
      this.getEntities();
    });
  };

  handleLoadMore = () => {
    if (window.pageYOffset > 0) {
      this.setState({ activePage: this.state.activePage + 1 }, () => this.getEntities());
    }
  };

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => {
        this.reset();
      }
    );
  };

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { reviewList, match } = this.props;
    return (
      <div>
        <h2 id="review-heading">
          Reviews
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Review
          </Link>
        </h2>
        <div className="table-responsive">
          <InfiniteScroll
            pageStart={this.state.activePage}
            loadMore={this.handleLoadMore}
            hasMore={this.state.activePage - 1 < this.props.links.next}
            loader={<div className="loader">Loading ...</div>}
            threshold={0}
            initialLoad={false}
          >
            {reviewList && reviewList.length > 0 ? (
              <Table responsive aria-describedby="review-heading">
                <thead>
                  <tr>
                    <th className="hand" onClick={this.sort('id')}>
                      ID <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('content')}>
                      Content <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('rating')}>
                      Rating <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('votes')}>
                      Votes <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('author')}>
                      Author <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('dateCreated')}>
                      Date Created <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('dateUpdated')}>
                      Date Updated <FontAwesomeIcon icon="sort" />
                    </th>
                    <th>
                      Article <FontAwesomeIcon icon="sort" />
                    </th>
                    <th>
                      Created By <FontAwesomeIcon icon="sort" />
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {reviewList.map((review, i) => (
                    <tr key={`entity-${i}`}>
                      <td>
                        <Button tag={Link} to={`${match.url}/${review.id}`} color="link" size="sm">
                          {review.id}
                        </Button>
                      </td>
                      <td>{review.content}</td>
                      <td>{review.rating}</td>
                      <td>{review.votes}</td>
                      <td>{review.author}</td>
                      <td>
                        <TextFormat type="date" value={review.dateCreated} format={APP_DATE_FORMAT} />
                      </td>
                      <td>
                        <TextFormat type="date" value={review.dateUpdated} format={APP_DATE_FORMAT} />
                      </td>
                      <td>{review.article ? <Link to={`article/${review.article.id}`}>{review.article.id}</Link> : ''}</td>
                      <td>{review.createdBy ? review.createdBy.id : ''}</td>
                      <td className="text-right">
                        <div className="btn-group flex-btn-group-container">
                          <Button tag={Link} to={`${match.url}/${review.id}`} color="info" size="sm">
                            <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${review.id}/edit`} color="primary" size="sm">
                            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${review.id}/delete`} color="danger" size="sm">
                            <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="alert alert-warning">No Reviews found</div>
            )}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ review }: IRootState) => ({
  reviewList: review.entities,
  totalItems: review.totalItems,
  links: review.links,
  entity: review.entity,
  updateSuccess: review.updateSuccess
});

const mapDispatchToProps = {
  getEntities,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Review);
