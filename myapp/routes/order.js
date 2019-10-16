var express = require('express');
var router = express.Router();
var mysql=require("mysql");
//var routeValidator = require('express-route-validator');

router.post('/', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
 // res.setHeader('Content-Type', 'application/x-www-form-urlencoded');



	console.log(req.body);
	res.locals.connection.query('SELECT status,track_info from orders where tracking_number=?',[req.body.tno], function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    console.log(JSON.stringify(results));
	});
});
module.exports = router;
