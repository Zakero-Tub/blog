import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './media.reducer';
import { IMedia } from 'app/shared/model/media.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMediaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MediaDetail extends React.Component<IMediaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { mediaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Media [<b>{mediaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{mediaEntity.name}</dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{mediaEntity.description}</dd>
            <dt>
              <span id="url">Url</span>
            </dt>
            <dd>{mediaEntity.url}</dd>
            <dt>
              <span id="type">Type</span>
            </dt>
            <dd>{mediaEntity.type}</dd>
          </dl>
          <Button tag={Link} to="/media" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/media/${mediaEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ media }: IRootState) => ({
  mediaEntity: media.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaDetail);
