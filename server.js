const dotenv = require('dotenv');
const fs = require('fs');
const http = require('http');
const https = require('https');

dotenv.config({ path: './config.env' });

const app = require('./app');

process.on('uncaughtException', (err) => {
    console.log('uncaught Exception');
    console.log(err.name, err.message);
    console.log(err.stack);

    process.exit(1);
});

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
