import { useEffect, useState } from 'react';
import { ICategory, IGame } from './models/categoryModel';

import { Navbar } from './components/Navbar';

export default function App() {
  const [data, setData] = useState<ICategory[] | undefined>();
  const [currentGame, setCurrentGame] = useState<IGame>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Get all games excepts recently played games
  async function fetchData(url: string): Promise<void> {
    try {
      const resData = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (resData) {
        const response: ICategory[] = await resData.json();
        setData(response);
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData('http://localhost:8082/api/games');
  }, []);

  //	popup function
  const handleClick = (
    title: string | undefined,
    provider: string | undefined,
    release_date: any
  ): void => {
    setIsOpen(true);
    setCurrentGame({ title, provider, release_date });
  };

  //	Transform jsondate to normal day, used for render single game's date
  function parseJsonDate(jsonDate: string): string {
    const date = new Date(jsonDate);
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
  }

  return (
    <>
      {/* Navbar component */}
      <Navbar />

      {/* popup to show single game info */}
      {currentGame && isOpen && (
        <div className='popup-container'>
          <div className='popup-body'>
            <h3>Title: {currentGame.title}</h3>
            <p>Provider: {currentGame.provider}</p>
            <p>
              Release Date: {parseJsonDate(currentGame.release_date as string)}
            </p>
            <button className='btn' onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Game list  */}
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
