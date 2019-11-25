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
import { getEntity, updateEntity, createEntity, reset } from './media.reducer';
import { IMedia } from 'app/shared/model/media.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMediaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMediaUpdateState {
  isNew: boolean;
  articleId: string;
}

export class MediaUpdate extends React.Component<IMediaUpdateProps, IMediaUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      articleId: '0',
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { mediaEntity } = this.props;
      const entity = {
        ...mediaEntity,
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
    this.props.history.push('/media');
  };

  render() {
    const { mediaEntity, articles, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="blogApp.media.home.createOrEditLabel">Create or edit a Media</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : mediaEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="media-id">ID</Label>
                    <AvInput id="media-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="media-name">
                    Name
                  </Label>
                  <AvField id="media-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="media-description">
                    Description
                  </Label>
                  <AvField id="media-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="urlLabel" for="media-url">
                    Url
                  </Label>
                  <AvField id="media-url" type="text" name="url" />
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel" for="media-type">
                    Type
                  </Label>
                  <AvInput
                    id="media-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && mediaEntity.type) || 'IMAGE'}
                  >
                    <option value="IMAGE">IMAGE</option>
                    <option value="VIDEO">VIDEO</option>
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/media" replace color="info">
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
  mediaEntity: storeState.media.entity,
  loading: storeState.media.loading,
  updating: storeState.media.updating,
  updateSuccess: storeState.media.updateSuccess
});

const mapDispatchToProps = {
  getArticles,
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
)(MediaUpdate);
