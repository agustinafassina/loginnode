var express = require('express');
var mysql = require('mysql');
//var Promise = require('promise');

var access = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'login_nodejs'

};

var db = mysql.createPool(access);

function promiseQuery(connection){
	return function query(sql, values){
		return new Promise(function(resolve, reject){
			connection.query(sql, values, function(err, res){
				if(err){
					reject(err);
				}else{
					resolve(res);
				}
			});
		});
	};
}

var query = promiseQuery(db);

module.exports = query;