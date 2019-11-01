module.exports = (db) => {
    const express = require('express');
    const booksRoutes = require('./books/routes');

    const app = express();

    const {clientError, errorHandler} = require('./error');

    app.use(express.json());

    app.get('/healthcheck', function (req, res) {
        res.send('Health Check !');
    });

    app.use('/books', booksRoutes);

    app.use(clientError);
    app.use(errorHandler);

    return app;
};