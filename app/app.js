import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
import route_v1 from './routes/v1';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
// app.use((req, res, next)=>{console.log(`request is handling process number ${process.pid}`); next()});

app.use('/v1', route_v1);

app.use((req, res, next)=> {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res)=> {
    console.error(err);
    // res.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    delete err.status;
    // res.render('error');
    res.json(err);
});

export default app;