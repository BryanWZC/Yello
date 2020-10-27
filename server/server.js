const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

const { connect } = require('./db/connect');
const port = process.env.PORT || 3000;

app.use(express.static('assets'));
app.use(morgan('dev'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public', 'index.html')));
app.get('/dist/bundle-front.js', (req, res) => res.sendFile(path.join(__dirname, '../dist', 'bundle-front.js')));

app.get('/test', (req, res) => res.send('Testing...1, 2, 3!'));

app.listen(port, async () => {
    await connect();
    console.log('Server is running. Listening on port 3000.')
});