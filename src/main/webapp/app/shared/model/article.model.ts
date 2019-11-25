import { Moment } from 'moment';
import { IMedia } from 'app/shared/model/media.model';
import { IUser } from 'app/shared/model/user.model';
import { ITag } from 'app/shared/model/tag.model';

export interface IArticle {
  id?: number;
  title?: string;
  content?: string;
  numberOfViews?: number;
  dateCreated?: Moment;
  dataUpdated?: Moment;
  thumbnail?: IMedia;
  createdBy?: IUser;
  galleries?: IMedia[];
  tags?: ITag[];
}

export const defaultValue: Readonly<IArticle> = {};
