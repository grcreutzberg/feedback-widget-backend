import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const HOST = process.env.HOST || 'http://localhost'
const PORT = process.env.PORT || 8000
const LOGMSG = '[Hello there!]:'

const app = express();
app.use(cors());
app.use(express.json())
app.use(routes);
app.listen(PORT, () => {
    console.log(`${LOGMSG} Server is running at ${HOST}:${PORT}`)
});