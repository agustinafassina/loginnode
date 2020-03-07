var express = require('express');
var connection = require('../modules/connection');
var users = {};
var crypto = require('crypto');
var mysql = ('mysql');

users.getAll = function(callbk){
	if (connection){
		connection('SELECT * FROM users ORDER BY id')
			.then(function(res){
				callbk(null, res);
			})
			.catch(function(res){
				console.log(res);
			});
	}
};

users.getOne = function(idUser, callbk){
	if (connection){
		connection('SELECT * FROM users where id =' + idUser)
			.then(function(result){
				callbk(null, result);
			})
			.catch(function(res){
				console.log('La consulta dio error. usuarios.unico');
			});
	}
};

users.insert = function(user, callbk){
	if(connection){
		connection('SELECT * FROM users WHERE email = "' + [user.email] + '"')
			.then(function(result){
				if(result.length !== 0){
					callbk(null, 0);
				}else{
					connection('INSERT INTO users SET name = ?, username = ?, email = ?, created_on = ?, password = ?, token = ?, date_expiration = ? ', [user.name, user.username, user.email, '1455478451', 'passwordencriptado', 'f473e06997a8da15e437c5f8ac1bd64b', '12545478'])
						.then(function(result){
							callbk(null, result);
						})
						.catch(function(res){
							console.log('Error al intentar insertar, users.insert');
						});	
				}
			})
			.catch(function(res){
				console.log('La consulta genera error users.insert');
			});
	}
};
/*
user.update = function(user, callbk){
	if(connection){
		connection('UPDATE user SET name = ?, username = ?, email = ? WHERE id = ? ', [user.name, user.username, user.email])
			.then(function(result){
				callbk(true);
			})
			.catch(function(res){
				console.log('Error al actualizar, user.update');
				callbk(err, false);
			});
	}
};*/

users.authenticate = function(user, callbk){
		var criptedPass = crypto.createHash('md5').update(user.password).digest('hex');
		connection('SELECT * FROM users WHERE email = ? AND password = ? ', [user.email, criptedPass])
			.then(function(res){
				if(res.length > 0){
					console.log(res);
					connection('UPDATE users SET token = ? WHERE email = ? AND password = ? ', [user.token, user.email, criptedPass])
						.then(function(result){
							// callbk(true, user.token);
							callbk(true, 'El usuario ' + user.email + ' ha ingresado', res);
						})
						.catch(function(res){
							console.log('Error al intentar update, users.authenticate');
						});	
					
				}else{
					console.log('dos');
					callbk(false, 'Hubo un intento de logueo con la cuenta ' + user.email, true);
				}
			})
			.catch(function(res){
				callbk(false, 'Hubo un error con la base de datos.');
			});
};


module.exports = users;