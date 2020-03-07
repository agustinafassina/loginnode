const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require('cors');
const routes = require('./config/routes');
const users = require('./controllers/users');
var authCtrl = require('./auth/index');

var app = express();

app.use(bodyParser.json());
app.use(router);

app.get('/', function(req, res){
	res.send('Api funcionando');
});

app.get('/version', function(req, res){
	res.send('Api funcionando 1.0.1 sin microservicios');
});

// Rutas de autenticación y login
//router.post('/auth/signup', auth.emailSignup);
//router.post('/auth/login', auth.emailLogin);

app.use('/apinode', routes);

var server = app.listen(8001, function(){
	console.log('Server listening on port ' + server.address().port);
});