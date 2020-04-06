const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

process.on('uncaughtException', (err) => {
    console.log('uncaught Exception');
    console.log(err.name, err.message);
    console.log(err.stack);

    process.exit(1);
});

const port = process.env.PORT || 80;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
