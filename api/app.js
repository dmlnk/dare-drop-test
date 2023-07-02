const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const routerV1 = require('./v1/routes/index');
const database = require('./config/database');

database.sync().then(() => { console.log('synced successfully'); });

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/api/v1', routerV1);

module.exports = app;
