import { useEffect, useState } from 'react';
import { ICategory } from './models/categoryModel';

import { Navbar } from './components/Navbar';

export default function App() {
  const [data, setData] = useState<ICategory[] | undefined>();
  const [currentGame, setCurrentGame] = useState<any>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Get all games excepts recently played games
  async function fetchData(url: string) {
    try {
      const resData = await fetch(url);
      const response: ICategory[] = await resData.json();
      setData(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData('http://localhost:8082/api/games');
  }, []);

  const handleClick = (
    title: string,
    provider: string,
    release_date: string
  ) => {
    setIsOpen(true);
    setCurrentGame({ title, provider, release_date });
  };

  function parseJsonDate(jsonDate: string) {
    const date = new Date(jsonDate);
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
  }

  return (
    <>
      <Navbar />
      {currentGame && isOpen && (
        <div className='popup-container'>
          <div className='popup-body'>
            <h3>Title: {currentGame.title}</h3>
            <p>Provider: {currentGame.provider}</p>
            <p>Release Date: {parseJsonDate(currentGame.release_date)}</p>
            <button className='btn' onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {data?.map((category) => (
        <div className='game-list' key={category.id}>
          <h1>Game category: {category.id}</h1>

          <div className='games border'>
            {category.games.map((game) => {
              return (
                <div
                  className='game'
                  key={game.id}
                  onClick={() =>
                    handleClick(game.title, game.provider, game.release_date)
                  }
                >
                  <img src={game.image} className='img-container' />
                  <h2>{game.title}</h2>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
