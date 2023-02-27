import { SingleGameModel } from './singleGameModel';

export interface GamelistModel {
  popular?: SingleGameModel['id'][];
  newGames?: SingleGameModel['id'][];
  pafExclusive?: SingleGameModel['id'][];
  recentlyPlayed?: SingleGameModel['id'][];
}
