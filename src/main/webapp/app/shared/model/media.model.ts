import { IArticle } from 'app/shared/model/article.model';
import { MediaType } from 'app/shared/model/enumerations/media-type.model';

export interface IMedia {
  id?: number;
  name?: string;
  description?: string;
  url?: string;
  type?: MediaType;
  articles?: IArticle[];
}

export const defaultValue: Readonly<IMedia> = {};
