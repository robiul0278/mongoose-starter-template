import express, { Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/users/users.routes';
const app = express();

// parsers
app.use(express.json());
app.use(cors());

app.use('/api/v1/user', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send(`OK! Mongoose is running at ${new Date().toLocaleTimeString()}!`);
});

export default app;
