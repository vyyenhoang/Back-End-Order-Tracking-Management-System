var express = require('express');
var router = express.Router();
var mysql=require("mysql");
var nodeMailer = require('nodemailer');

//var routeValidator = require('express-route-validator');

router.post('/', function(req, res, next) {
	console.log(req.body)
    var est=req.body.est;
	var link= 'http://localhost:4200/paymentdetail';
	res.locals.connection.query("update quotereq set estimate = ('"+est+"') where email=?",[req.body.email], function (error, results, fields) {
		if (error) throw error;
		//res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		else

{
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    secureConnection: false,
    port: 587,
    tls: {
        chipers: "SSLv3"
    },
    auth: {
        user: "saminakhan54688@gmail.com",
        pass: "xdrtfcrpuuaixdfp"
    }
});

var mailOptions = {
    from: "saminakhan54688@gmail.com",
    to: req.body.email,
    subject: "Quote Request....!!!",
    text: "The calculated estimate for you order is " + est + "If you want to continue then click on this link" ,
	//html: <a href= "http://localhost:4200/paymentdetail"> </a> ,
};

transporter.sendMail(mailOptions, function(error, info) {
    if (error) console.log(error);
    else console.log("Message sent successfully: " + info.response);
    
res.json({
                  status:true,
                  message:"Done..."
                 });
});

            
}

	});
});


module.exports = router;

