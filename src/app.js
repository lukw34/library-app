module.exports = (db) => {
    const express = require('express');
    const booksRepository = require('./books/booksRepository')(db);
    const booksController = require('./books/booksController')({ booksRepository });
    const booksRoutes = require('./books/routes')(booksController);

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