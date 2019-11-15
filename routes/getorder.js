var express = require('express');
var router = express.Router();
var mysql=require("mysql");
//var routeValidator = require('express-route-validator');

router.get('/', function(req, res, next) {
	res.locals.connection.query('SELECT * from orders  ', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});


module.exports = router;

