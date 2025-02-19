import express, { Request, Response } from 'express';
import cors from 'cors';
const app = express();

// parsers
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send(`Mongoose is running at ${new Date().toLocaleTimeString()}!`);
});

export default app;
