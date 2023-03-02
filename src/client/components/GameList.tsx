import { getAppData, getGames } from '../hooks/useFetch';
import AppData from 'client/models/appDataModel';
import { GamesDataModel } from '../models/gameListsModel';
import React, { useEffect, useState } from 'react';
import GameCard from './GameCard';

const GameList = () => {
  const [appData, setAppData] = useState<AppData>();
  const [gamesData, setGamesData] = useState<GamesDataModel>();

  useEffect(() => {
    const fetchData = async () => {
      setGamesData(await getGames());
      setAppData(await getAppData());
    };
    fetchData();
  }, []);

  return (
    <div className='game-list'>
      <h3>List title</h3>
      <div className='games'>
        <GameCard />
      </div>
    </div>
  );
};

export default GameList;
