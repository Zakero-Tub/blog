import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMedia, defaultValue } from 'app/shared/model/media.model';

export const ACTION_TYPES = {
  FETCH_MEDIA_LIST: 'media/FETCH_MEDIA_LIST',
  FETCH_MEDIA: 'media/FETCH_MEDIA',
  CREATE_MEDIA: 'media/CREATE_MEDIA',
  UPDATE_MEDIA: 'media/UPDATE_MEDIA',
  DELETE_MEDIA: 'media/DELETE_MEDIA',
  RESET: 'media/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMedia>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MediaState = Readonly<typeof initialState>;

// Reducer

export default (state: MediaState = initialState, action): MediaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MEDIA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MEDIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MEDIA):
    case REQUEST(ACTION_TYPES.UPDATE_MEDIA):
    case REQUEST(ACTION_TYPES.DELETE_MEDIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MEDIA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MEDIA):
    case FAILURE(ACTION_TYPES.CREATE_MEDIA):
    case FAILURE(ACTION_TYPES.UPDATE_MEDIA):
    case FAILURE(ACTION_TYPES.DELETE_MEDIA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEDIA_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_MEDIA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MEDIA):
    case SUCCESS(ACTION_TYPES.UPDATE_MEDIA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MEDIA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/media';

// Actions

export const getEntities: ICrudGetAllAction<IMedia> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MEDIA_LIST,
    payload: axios.get<IMedia>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IMedia> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MEDIA,
    payload: axios.get<IMedia>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMedia> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MEDIA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IMedia> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MEDIA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMedia> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MEDIA,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
