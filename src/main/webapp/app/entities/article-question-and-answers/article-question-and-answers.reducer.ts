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

import { IArticleQuestionAndAnswers, defaultValue } from 'app/shared/model/article-question-and-answers.model';

export const ACTION_TYPES = {
  FETCH_ARTICLEQUESTIONANDANSWERS_LIST: 'articleQuestionAndAnswers/FETCH_ARTICLEQUESTIONANDANSWERS_LIST',
  FETCH_ARTICLEQUESTIONANDANSWERS: 'articleQuestionAndAnswers/FETCH_ARTICLEQUESTIONANDANSWERS',
  CREATE_ARTICLEQUESTIONANDANSWERS: 'articleQuestionAndAnswers/CREATE_ARTICLEQUESTIONANDANSWERS',
  UPDATE_ARTICLEQUESTIONANDANSWERS: 'articleQuestionAndAnswers/UPDATE_ARTICLEQUESTIONANDANSWERS',
  DELETE_ARTICLEQUESTIONANDANSWERS: 'articleQuestionAndAnswers/DELETE_ARTICLEQUESTIONANDANSWERS',
  RESET: 'articleQuestionAndAnswers/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IArticleQuestionAndAnswers>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ArticleQuestionAndAnswersState = Readonly<typeof initialState>;

// Reducer

export default (state: ArticleQuestionAndAnswersState = initialState, action): ArticleQuestionAndAnswersState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ARTICLEQUESTIONANDANSWERS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ARTICLEQUESTIONANDANSWERS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ARTICLEQUESTIONANDANSWERS):
    case REQUEST(ACTION_TYPES.UPDATE_ARTICLEQUESTIONANDANSWERS):
    case REQUEST(ACTION_TYPES.DELETE_ARTICLEQUESTIONANDANSWERS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ARTICLEQUESTIONANDANSWERS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ARTICLEQUESTIONANDANSWERS):
    case FAILURE(ACTION_TYPES.CREATE_ARTICLEQUESTIONANDANSWERS):
    case FAILURE(ACTION_TYPES.UPDATE_ARTICLEQUESTIONANDANSWERS):
    case FAILURE(ACTION_TYPES.DELETE_ARTICLEQUESTIONANDANSWERS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ARTICLEQUESTIONANDANSWERS_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_ARTICLEQUESTIONANDANSWERS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ARTICLEQUESTIONANDANSWERS):
    case SUCCESS(ACTION_TYPES.UPDATE_ARTICLEQUESTIONANDANSWERS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ARTICLEQUESTIONANDANSWERS):
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

const apiUrl = 'api/article-question-and-answers';

// Actions

export const getEntities: ICrudGetAllAction<IArticleQuestionAndAnswers> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ARTICLEQUESTIONANDANSWERS_LIST,
    payload: axios.get<IArticleQuestionAndAnswers>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IArticleQuestionAndAnswers> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ARTICLEQUESTIONANDANSWERS,
    payload: axios.get<IArticleQuestionAndAnswers>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IArticleQuestionAndAnswers> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ARTICLEQUESTIONANDANSWERS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IArticleQuestionAndAnswers> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ARTICLEQUESTIONANDANSWERS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IArticleQuestionAndAnswers> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ARTICLEQUESTIONANDANSWERS,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
