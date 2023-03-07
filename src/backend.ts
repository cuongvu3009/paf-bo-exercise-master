import express, { NextFunction, Request, Response } from 'express';

import appData from './api/app.json' assert { type: 'json' };
import categories from './api/categories.json' assert { type: 'json' };
import gameLists from './api/game-lists.json' assert { type: 'json' };
import games from './api/games.json' assert { type: 'json' };

import cors from 'cors';
import helmet from 'helmet';

//	ApiError class
class ApiError extends Error {
  constructor(
    readonly statusCode: number,
    readonly message: string,
    readonly source?: Error
  ) {
    super();
  }
}

//	Cache setup
const setCache = function (
  req: Request,
  res: Response,
  next: NextFunction
): void {
  //	Keep cache for 5 minutes (in seconds)
  const period = 60 * 5;

  //	cache for GET requests only
  if (req.method === 'GET') {
    res.set('Cache-control', `public, max-age=${period}`);
  } else {
    //	for the other requests set strict no caching parameters
    res.set('Cache-control', `no-store`);
  }

  next();
};

//	Type declaration
interface IGame {
  title: string;
  provider: string;
  release_date: string;
  image: string;
  launch_url: string;
  launch_base_url: string;
  in_maintenance: boolean;
  id: number;
}

declare global {
  type Dictionary<T> = { [key: string]: T };
}

const mapGames: Dictionary<any> = games;

//	Server config
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
app.use(setCache);

//	Transform raw JSON to a well restructured JSON
function transform(arr: Array<string>): Array<IGame> {
  let newArr = [];
  for (let i = 0; i <= arr.length; i++) {
    for (let j = 0; j <= 7; j++) {
      if (parseInt(arr[i]) === parseInt(Object.keys(mapGames)[j])) {
        newArr.push({
          ...mapGames[j + 1],
          id: parseInt(Object.keys(mapGames)[j]),
        });
      }
    }
  }
  return newArr;
}
let popularGames = transform(gameLists['popular']);
let recentlyPlayedGames = transform(gameLists['recently-played']);
let newGames = transform(gameLists['new-games']);
let exclusiveGames = transform(gameLists['paf-exclusive']);

let popularCategory = categories[1];
let newGamesCategory = categories[2];
let exclusiveGamesCategory = categories[3];
let recentlyPlayedCategory = categories[4];

// Set up routers
app.get('/api/games', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json([
    {
      ...exclusiveGamesCategory,
      games: exclusiveGames,
      hits: exclusiveGames.length,
    },
    {
      ...newGamesCategory,
      games: newGames,
      hits: newGames.length,
    },
    {
      ...popularCategory,
      games: popularGames,
      hits: popularGames.length,
    },
  ]);
});
app.use(
  '/api/games/recentlyplayed',
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      ...recentlyPlayedCategory,
      games: recentlyPlayedGames,
      hits: recentlyPlayedGames.length,
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

//	Server start function
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
