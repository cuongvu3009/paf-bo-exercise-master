import { useEffect, useState } from 'react';
import { ICategory } from './models/categoryModel';

import { Navbar } from './components/Navbar';

export default function App() {
  const [data, setData] = useState<ICategory[]>();

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

  return (
    <>
      <Navbar />

      {data?.map((category) => (
        <div className='game-list' key={category.id}>
          <h1>Game category: {category.id}</h1>

          <div className='games border'>
            {category.games.map((game) => {
              return (
                <div className='game' key={game.id}>
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
