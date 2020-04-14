const path = require('path');

const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const viewRoutes = require('./routes/viewRoutes');
const statsRoutes = require('./routes/statsRoutes');

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

// // Rate Limiting
// const apiLimiter = rateLimit({
//     windowMs: 60 * 1000,
//     max: 6,
// });

// // TODO implement rate limiting, but api uses same route for getting stats so rate limiting will apply to the results graph

// app.use('/api/v1/stats', (req, res, next) => {
//     console.log(req.method);
//     if (req.method == 'POST') {
//         console.log('here');
//         app.use(apiLimiter);
//     }

//     return next();
// });

app.use('/', viewRoutes);
app.use('/api/v1/stats', statsRoutes);

app.all('*', (req, res, next) => {
    //console.log(`Can't find ${req.originalUrl} on this server.`);
    next();
    //next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//app.use(/*function for handling errors*/);

module.exports = app;
