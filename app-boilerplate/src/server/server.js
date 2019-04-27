require('dotenv').config();
const config = require('./config/config');
const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();
const port = config.port;

app.use(cors());

app.use('/', function(req, res) {
let url = config.apiUrl;
let query = config.assignKey(req.query);

req.pipe(request({ qs: query, uri: url})).pipe(res);
});

app.listen(port, () => {
    console.log("+-----------------------+");
    console.log(`| Listening on port: ${port}  |`);
    console.log("+-----------------------+");
})