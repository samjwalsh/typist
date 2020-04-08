const dotenv = require('dotenv');
const fs = require('fs');
const http = require('http');
const https = require('https');
const mongoose = require('mongoose');

try {
    dotenv.config({ path: './config.env' });
} catch (e) {
    console.log('Found no config.env file');
}
const app = require('./app');

process.on('uncaughtException', (err) => {
    console.log('uncaught Exception');
    console.log(err.name, err.message);
    console.log(err.stack);

    process.exit(1);
});

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB Connected'));

if (process.env.ENABLE_HTTP === 'true') {
    http.createServer(app).listen(process.env.HTTPS_PORT ? process.env.HTTP_PORT : 80, console.log(`HTTPS server running on port ${process.env.HTTP_PORT}`));
}

if (process.env.ENABLE_HTTPS === 'true') {
    https
        .createServer(
            {
                key: fs.readFileSync('./keys/private.key'),
                cert: fs.readFileSync('./keys/public.key'),
            },
            app
        )
        .listen(process.env.HTTPS_PORT ? process.env.HTTPS_PORT : 80, () => {
            console.log(`HTTPS server running on port ${process.env.HTTPS_PORT}`);
        });
}
