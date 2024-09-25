import express, {Express, Request, Response} from 'express';
import connectToDB from 'config/db';

const app: Express = express();
connectToDB()
const port = 3000;

app.get('/', (req: Request, res: Response)=>{
    res.send('Hello, this is Express + TypeScript');
});

app.listen(port, ()=> {
console.log(`[Server]: I am running at https://localhost:${port}`);
});

