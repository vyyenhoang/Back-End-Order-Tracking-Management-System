var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.post('/', function(req, res, next) {
	// res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');

	// res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
  //   req.body.serverMessage = "NodeJS replying to angular"
	console.log(req.body);
	res.locals.connection.query("INSERT INTO customer(f_name, l_name, email, cargo_type, country_origin, destination) VALUES ('"+req.body.fname+"','"+req.body.lname+"','"+req.body.email+"','"+req.body.cargo+"','"+req.body.corigin+"','"+req.body.destination+"')", function (error, results, fields) {
		if (error) throw error;


	// 	res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	// 	console.log("1 record inserted");
	// });
else

{
  	res.locals.connection.query('SELECT id from customer where email=?',[req.body.email], function (error, results, fields) {
		if (error) throw error;


		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		console.log("1 record inserted against id=", JSON.stringify(results));
	});
}

});

});
module.exports = router;
