const path = require('path');
const fs = require('fs');
const https = require('https');

const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
// const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const viewRoutes = require('./routes/viewRoutes');
const statsRoutes = require('./routes/statsRoutes');

// Creating https server
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//GLOBAL MIDDLEWARES

// Serving static files
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '7d' }));

// Set security HTTP headers
app.use(helmet());

app.use(cors());

// Use gzip compression
app.use(compression());

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan(':method :total-time ms :date :url'));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use('/', viewRoutes);
app.use('/api/v1/stats', statsRoutes);

app.all('*', (req, res, next) => {
    //console.log(`Can't find ${req.originalUrl} on this server.`);
    next();
    //next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//app.use(/*function for handling errors*/);

module.exports = app;
