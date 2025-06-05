import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import tareaRoutes from './routes/tarea.routes.js';
import listaRoutes from './routes/lista.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());