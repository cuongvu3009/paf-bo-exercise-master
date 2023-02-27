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

// Set up routers
app.post('/api/games');
app.post('/api/protected');

app.get('/api/appData', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(appData);
});
app.get(
  '/api/categories',
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(categories);
  }
);
app.get('/api/gameLists', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(gameLists);
});
app.get('/api/games', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(games);
});

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
