module.exports = async (db) => {
    const express = require('express');
    const next = require('next');

    const dev = process.env.NODE_ENV !== 'production';
    const app = next({ dev });

    const handle = app.getRequestHandler();

    const booksRepository = require('./books/booksRepository')(db);
    const booksController = require('./books/booksController')({ booksRepository });
    const booksRoutes = require('./books/routes')(booksController);

    const server = express();

    const {clientError, errorHandler} = require('./error');

    await app.prepare();

    server.use(express.json());


    server.get('/healthcheck', function (req, res) {
        res.send('Health Check !');
    });

    server.use('api/books', booksRoutes);

    server.get('*', (req, res) => {
        return handle(req, res)
    });

    server.use(clientError);
    server.use(errorHandler);


    return server;
};