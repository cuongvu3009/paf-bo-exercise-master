import { SingleGameModel } from 'client/models/singleGameModel';
import React from 'react';

const GameCard = ({ game }: any) => {
  return (
    <div>
      <img src={game.image} className='img-container' />
      <h2>{game.title}</h2>
    </div>
  );
};

export default GameCard;
