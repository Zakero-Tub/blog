import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ArticleQuestionAndAnswers from './article-question-and-answers';
import ArticleQuestionAndAnswersDetail from './article-question-and-answers-detail';
import ArticleQuestionAndAnswersUpdate from './article-question-and-answers-update';
import ArticleQuestionAndAnswersDeleteDialog from './article-question-and-answers-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ArticleQuestionAndAnswersUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ArticleQuestionAndAnswersUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ArticleQuestionAndAnswersDetail} />
      <ErrorBoundaryRoute path={match.url} component={ArticleQuestionAndAnswers} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ArticleQuestionAndAnswersDeleteDialog} />
  </>
);

export default Routes;
