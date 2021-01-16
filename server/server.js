// Internal modules - built-in
const path = require('path');

// External modules
require('dotenv').config({ path: path.join(__dirname, '../.env')});
const morgan = require('morgan');
const cookieParser      = require('cookie-parser');
const passport          = require('passport');
const LocalStrategy     = require('passport-local').Strategy;
const express = require('express');
const helmet = require('helmet');
const app = express();

// Internal modules - DB 
const connect = require('./db/connect');
const PORT = process.env.PORT || 3000;

// Internal modules - Routes
const loginRoutes = require('./routes/login-routes');
const signUpRoutes = require('./routes/sign-up-routes');
const userRoutes = require('./routes/user-page-routes');
const boardRoutes = require('./routes/board-routes');
const guestBoardRoutes = require('./routes/board-guest-routes');
const unsplashRoutes = require('./routes/unsplash-routes');

// Internal modules - utility
const { catchNotFoundError, errorHandler }  = require('./utility/server-utils');

// Middleware
// app.use(morgan('dev'));
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./assets'));
app.use(cookieParser());
app.use(require('express-session')({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport config
const { User } = require('./db/model');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use('/', loginRoutes);
app.use('/', signUpRoutes);
app.use('/user', userRoutes)
app.use('/board', guestBoardRoutes);
app.use('/board', unsplashRoutes);
app.use('/board', boardRoutes);

// Error handlers
app.use((req, res, next) => catchNotFoundError(req, res, next)); 
app.use(errorHandler);

// Listen
app.listen(PORT, async () => {
    await connect();
    console.log('Server is running. Listening on port 3000.');
});