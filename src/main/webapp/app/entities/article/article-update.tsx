import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IMedia } from 'app/shared/model/media.model';
import { getEntities as getMedia } from 'app/entities/media/media.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ITag } from 'app/shared/model/tag.model';
import { getEntities as getTags } from 'app/entities/tag/tag.reducer';
import { getEntity, updateEntity, createEntity, reset } from './article.reducer';
import { IArticle } from 'app/shared/model/article.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IArticleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IArticleUpdateState {
  isNew: boolean;
  idsgallery: any[];
  idstags: any[];
  thumbnailId: string;
  createdById: string;
}

export class ArticleUpdate extends React.Component<IArticleUpdateProps, IArticleUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsgallery: [],
      idstags: [],
      thumbnailId: '0',
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

    this.props.getMedia();
    this.props.getUsers();
    this.props.getTags();
  }

  saveEntity = (event, errors, values) => {
    values.dateCreated = convertDateTimeToServer(values.dateCreated);
    values.dataUpdated = convertDateTimeToServer(values.dataUpdated);

    if (errors.length === 0) {
      const { articleEntity } = this.props;
      const entity = {
        ...articleEntity,
        ...values,
        galleries: mapIdList(values.galleries),
        tags: mapIdList(values.tags)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/article');
  };

  render() {
    const { articleEntity, media, users, tags, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="blogApp.article.home.createOrEditLabel">Create or edit a Article</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : articleEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="article-id">ID</Label>
                    <AvInput id="article-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="article-title">
                    Title
                  </Label>
                  <AvField id="article-title" type="text" name="title" />
                </AvGroup>
                <AvGroup>
                  <Label id="contentLabel" for="article-content">
                    Content
                  </Label>
                  <AvField id="article-content" type="text" name="content" />
                </AvGroup>
                <AvGroup>
                  <Label id="numberOfViewsLabel" for="article-numberOfViews">
                    Number Of Views
                  </Label>
                  <AvField id="article-numberOfViews" type="string" className="form-control" name="numberOfViews" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateCreatedLabel" for="article-dateCreated">
                    Date Created
                  </Label>
                  <AvInput
                    id="article-dateCreated"
                    type="datetime-local"
                    className="form-control"
                    name="dateCreated"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.articleEntity.dateCreated)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dataUpdatedLabel" for="article-dataUpdated">
                    Data Updated
                  </Label>
                  <AvInput
                    id="article-dataUpdated"
                    type="datetime-local"
                    className="form-control"
                    name="dataUpdated"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.articleEntity.dataUpdated)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="article-thumbnail">Thumbnail</Label>
                  <AvInput id="article-thumbnail" type="select" className="form-control" name="thumbnail.id">
                    <option value="" key="0" />
                    {media
                      ? media.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="article-createdBy">Created By</Label>
                  <AvInput id="article-createdBy" type="select" className="form-control" name="createdBy.id">
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
                <AvGroup>
                  <Label for="article-gallery">Gallery</Label>
                  <AvInput
                    id="article-gallery"
                    type="select"
                    multiple
                    className="form-control"
                    name="galleries"
                    value={articleEntity.galleries && articleEntity.galleries.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {media
                      ? media.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.gallery}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="article-tags">Tags</Label>
                  <AvInput
                    id="article-tags"
                    type="select"
                    multiple
                    className="form-control"
                    name="tags"
                    value={articleEntity.tags && articleEntity.tags.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {tags
                      ? tags.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.tags}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/article" replace color="info">
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
  media: storeState.media.entities,
  users: storeState.userManagement.users,
  tags: storeState.tag.entities,
  articleEntity: storeState.article.entity,
  loading: storeState.article.loading,
  updating: storeState.article.updating,
  updateSuccess: storeState.article.updateSuccess
});

const mapDispatchToProps = {
  getMedia,
  getUsers,
  getTags,
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
)(ArticleUpdate);
