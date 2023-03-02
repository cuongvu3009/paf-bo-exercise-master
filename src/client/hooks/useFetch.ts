import AppData from 'client/models/appDataModel';
import { GamesDataModel } from 'client/models/gameListsModel';

export async function getGames(): Promise<GamesDataModel> {
  return fetch('http://localhost:8082/api/games')
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

export async function getAppData(): Promise<AppData> {
  return fetch('http://localhost:8082/api')
    .then((res) => res.json())
    .catch((error) => console.log(error));
}
