import express, { NextFunction, Request, Response } from 'express';

import appData from './api/app.json' assert { type: 'json' };
import categories from './api/categories.json' assert { type: 'json' };
import gameLists from './api/game-lists.json' assert { type: 'json' };
import games from './api/games.json' assert { type: 'json' };

import cors from 'cors';
import helmet from 'helmet';

import ApiError from './helpers/apiError';

const PORT = 8082;

const app = express();

// Global middleware
app.use(
  cors({
    //	Origin (*) for demo only
    origin: '*',
    methods: ['GET'],
    credentials: true,
  })
);
app.use(express.json());
app.use(helmet());

let popularGames = transform(gameLists['popular']);
let recentlyPlayedGames = transform(gameLists['recently-played']);
let newGames = transform(gameLists['new-games']);
let exclusiveGames = transform(gameLists['paf-exclusive']);

function transform(arr: Array<any>) {
  let newArr = [];
  for (let i = 0; i <= arr.length; i++) {
    for (let j = 0; j <= 7; j++) {
      if (parseInt(arr[i]) === parseInt(Object.keys(games)[j])) {
        newArr.push({
          ...games[j + 1],
          id: parseInt(Object.keys(games)[j]),
        });
      }
    }
  }
  return newArr;
}

let popularCategory = categories[1];
let newGamesCategory = categories[2];
let exclusiveGamesCategory = categories[3];
let recentlyPlayedCategory = categories[4];

// Set up routers
app.get('/api/app', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(appData);
});

app.use(
  '/api/games/exclusive',
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      exclusiveGamesCategory: {
        ...exclusiveGamesCategory,
        games: exclusiveGames,
        hits: exclusiveGames.length,
      },
    });
  }
);
app.use(
  '/api/games/newgames',
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      newGamesCategory: {
        ...newGamesCategory,
        games: newGames,
        hits: newGames.length,
      },
    });
  }
);
app.use(
  '/api/games/populargames',
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      popularCategory: {
        ...popularCategory,
        games: popularGames,
        hits: popularGames.length,
      },
    });
  }
);
app.use(
  '/api/games/recentlyplayed',
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      recentlyPlayedCategory: {
        ...recentlyPlayedCategory,
        games: recentlyPlayedGames,
        hits: recentlyPlayedGames.length,
      },
    });
  }
);

// Custom API error handler

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Something went wrong';
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

//	Server
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
