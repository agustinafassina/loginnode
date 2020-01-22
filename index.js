var express = require('express');
var http = require('http');
var app = express();
var mysql = require('mysql');

var users = ['ludmi', 'lucio', 'lara']

app.get('/users', (req, res) => {
    res.send('Hello :Agus')
})

app.get('/', (req, res) => {
    res.status(200).send("Welcome to API REST")
})

http.createServer(app).listen(8005, () => {
    console.log('Server started at http://localhost:8005');
});
  