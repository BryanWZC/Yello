// External modules
const express = require('express');
const app = express();
const morgan = require('morgan');

// Internal modules - DB 
const { connect } = require('./db/connect');
const PORT = process.env.PORT || 3000;

// Internal modules - Routes
const baseRoutes = require('./routes/base-routes');
const unsplashRoutes = require('./routes/unsplash-routes');

// Middleware
app.use(express.static('assets'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
baseRoutes(app);
unsplashRoutes(app);

// Listen
app.listen(PORT, async () => {
    await connect();
    console.log('Server is running. Listening on port 3000.')
});