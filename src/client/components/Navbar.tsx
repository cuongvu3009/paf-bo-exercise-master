import { ICategory } from 'client/models/categoryModel';
import { FC, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const Navbar: FC = () => {
  const { isAuthenticated, loginWithPopup, logout } = useAuth0();
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
      <h1 className='app-title'>PAF</h1>
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
            Logout
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
