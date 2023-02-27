import { SingleGameModel } from './singleGameModel';

export interface CategoryModel {
  id: string;
  items?: SingleGameModel[];
  title: string;
}
