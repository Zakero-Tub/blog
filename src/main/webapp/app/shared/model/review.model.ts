import { Moment } from 'moment';
import { IArticle } from 'app/shared/model/article.model';
import { IUser } from 'app/shared/model/user.model';

export interface IReview {
  id?: number;
  content?: string;
  rating?: number;
  votes?: number;
  author?: string;
  dateCreated?: Moment;
  dateUpdated?: Moment;
  article?: IArticle;
  createdBy?: IUser;
}

export const defaultValue: Readonly<IReview> = {};
