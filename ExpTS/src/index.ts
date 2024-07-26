import express from 'express';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars';
import router from './router/router';
import { logger } from './middleware/logger';
import cookieParser from 'cookie-parser';
import session from 'express-session'
import { v4 } from "uuid"

declare module "express-session" {
    interface SessionData {
        uid: string
    }
}

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 8080;

app.engine('handlebars', engine({ helpers: require('./views/helpers/helpers') }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

app.use(logger('complete'));
app.use(express.urlencoded({ extended: false })); // Configuração do middleware para processar formulários

app.use(cookieParser())
app.use(session({
    genid: () => v4(),
    secret: "vernv&nfe*&",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 360000 },
}))
app.use(router);


app.listen(PORT, () => console.log(`rodando aqui ${PORT}`));
