var express = require('express');

//Controllers for routes
var users = require('../../controllers/users');

var routes = express.Router();

routes.get('/users', users.getAll);
routes.get('/users/:idUser', users.getOne);
routes.post('/users', users.insert);
//routes.update('/users/:idUser', users.update);
routes.post('/users/authenticate', users.authenticate);


module.exports = routes;