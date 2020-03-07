var tools = {};

tools.printDate = function(){
	var fecha = new Date();
	return fecha.getDate() + '/' + fecha.getMonth() + '/' + fecha.getFullYear() + ' ' + fecha.getHours() + ':' + fecha.getMinutes();
};

module.exports = tools;
