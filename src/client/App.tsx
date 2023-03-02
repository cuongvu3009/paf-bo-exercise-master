import { FC, useEffect, useState } from 'react';
import { ICategory } from './models/categoryModel';
import '../styles.css';
import AppData from './models/appDataModel';
import { useAuth0 } from '@auth0/auth0-react';
import { IUser } from './models/userModel';

export default function App() {
  const [data, setData] = useState<ICategory[]>();
  const [appData, setAppData] = useState<AppData>();

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

  //	Get app data
  useEffect(() => {
    const fetchData = async () => {
      const resData = await fetch('http://localhost:8082/api/app');
      const response: AppData = await resData.json();
      setAppData(response);
    };
    fetchData();
  }, []);

  //	Navbar component
  const Navbar: FC = () => {
    const { user, isAuthenticated, loginWithPopup, logout } = useAuth0();
    const [recentlyPlayed, setRecentlyPlayed] = useState<ICategory>();

    //	Get rececently played games if user login
    useEffect(() => {
      const fetchData = async () => {
        const resData = await fetch(
          'http://localhost:8082/api/games/recentlyplayed'
        );
        const response: ICategory = await resData.json();
        setRecentlyPlayed(response);
      };
      fetchData();
    }, []);

    return (
      <div className='navbar'>
        <h1 className='app-title'>{appData?.app}</h1>
        {isAuthenticated ? (
          <>
            <div>
              {recentlyPlayed && (
                <div className='flex'>
                  Recently:
                  {recentlyPlayed?.games.map((game) => (
                    <div key={game.title}>
                      <img src={game.image} className='img-container-sm' />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => logout()} className='login-btn'>
              Log Out
            </button>
          </>
        ) : (
          <>
            <button className='login-btn' onClick={() => loginWithPopup()}>
              Login
            </button>
          </>
        )}
      </div>
    );
  };

  //	primary return
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
