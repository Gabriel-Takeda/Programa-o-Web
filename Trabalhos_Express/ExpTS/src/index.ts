import express from 'express';
import dotenv from 'dotenv';

import router from './router/router';
import {logger} from './middleware/logger';

import { engine } from 'express-handlebars'

dotenv.config()
const app = express()
const PORT = process.env.PORT ?? 8080;

app.engine(
    'handlebars',
    engine({helpers: require(`${__dirname}/views/helpers/helpers`)}));
    
app.set("view engine", "handlebars")
app.set("views", `${__dirname}/views`)

app.use(logger('complete'));
app.use(router)
app.locals.valor = "10"

app.listen(PORT, ()=> console.log(`rodando aqui ${PORT}`))