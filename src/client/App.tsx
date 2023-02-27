import React from 'react';
import Category from './components/Category';
import GameList from './components/GameList';

export default function App() {
  return (
    <>
      <div>
        <Category />
      </div>
      <div>
        <GameList />
        <GameList />
        <GameList />
        <GameList />
      </div>
    </>
  );
}
