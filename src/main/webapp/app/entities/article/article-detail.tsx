import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './article.reducer';
import { IArticle } from 'app/shared/model/article.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IArticleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ArticleDetail extends React.Component<IArticleDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { articleEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Article [<b>{articleEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">Title</span>
            </dt>
            <dd>{articleEntity.title}</dd>
            <dt>
              <span id="content">Content</span>
            </dt>
            <dd>{articleEntity.content}</dd>
            <dt>
              <span id="numberOfViews">Number Of Views</span>
            </dt>
            <dd>{articleEntity.numberOfViews}</dd>
            <dt>
              <span id="dateCreated">Date Created</span>
            </dt>
            <dd>
              <TextFormat value={articleEntity.dateCreated} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="dataUpdated">Data Updated</span>
            </dt>
            <dd>
              <TextFormat value={articleEntity.dataUpdated} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>Thumbnail</dt>
            <dd>{articleEntity.thumbnail ? articleEntity.thumbnail.id : ''}</dd>
            <dt>Created By</dt>
            <dd>{articleEntity.createdBy ? articleEntity.createdBy.id : ''}</dd>
            <dt>Gallery</dt>
            <dd>
              {articleEntity.galleries
                ? articleEntity.galleries.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.gallery}</a>
                      {i === articleEntity.galleries.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>Tags</dt>
            <dd>
              {articleEntity.tags
                ? articleEntity.tags.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.tags}</a>
                      {i === articleEntity.tags.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/article" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/article/${articleEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ article }: IRootState) => ({
  articleEntity: article.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleDetail);
