import express from 'express';
const app = express();

import index_routher from './index';
import user_routher from './users';

app.use('/', index_routher);
app.use('/user', user_routher);

export default app;