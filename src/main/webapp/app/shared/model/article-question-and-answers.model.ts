import { Moment } from 'moment';
import { IArticle } from 'app/shared/model/article.model';
import { IArticleQuestionAndAnswers } from 'app/shared/model/article-question-and-answers.model';
import { IUser } from 'app/shared/model/user.model';

export interface IArticleQuestionAndAnswers {
  id?: number;
  content?: string;
  votes?: number;
  author?: string;
  email?: string;
  dateCreated?: Moment;
  dateUpdated?: Moment;
  article?: IArticle;
  answer?: IArticleQuestionAndAnswers;
  createdBy?: IUser;
}

export const defaultValue: Readonly<IArticleQuestionAndAnswers> = {};
