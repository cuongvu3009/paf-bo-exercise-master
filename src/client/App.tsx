import { useEffect, useState } from 'react';
import { ICategory } from './models/categoryModel';

export default function App() {
  const [data, setData] = useState<ICategory[]>();

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
      {data?.map((i) => {
        return (
          <div className='game-list'>
            <h1>Game category: {i.id}</h1>

            <div className='games'>
              {i.games.map((game) => (
                <div className='game'>
                  <img src={game.image} className='img-container' />
                  <h2>{game.title}</h2>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
