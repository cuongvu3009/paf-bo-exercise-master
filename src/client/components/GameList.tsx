import React, { useState } from 'react';
import GameCard from './GameCard';
import gameData from '../../api/games.json';

const GameList = () => {
  const [games, setGames] = useState(Object.entries(gameData));

  return (
    <div className='game-list'>
      <h3>List title</h3>
      <div className='games'>
        {games.map((game) => {
          return (
            <>
              <GameCard game={game[1]} key={game[0]} />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default GameList;
