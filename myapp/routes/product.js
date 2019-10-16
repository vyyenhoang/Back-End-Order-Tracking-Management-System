var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');



router.post('/', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');

	res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.body.serverMessage = "NodeJS replying to angular"
	console.log(req.body);
	res.locals.connection.query("INSERT INTO product(customer_id, item_price, item_weight, item_width,item_height,quantity,discount) VALUES ('"+req.body.cid+"','"+req.body.iprice+"','"+req.body.iweight+"','"+req.body.iwidth+"','"+req.body.iheight+"','"+req.body.quantity+"','"+req.body.discount+"')", function (error, results, fields) {
		if (error) {
        console.log(error);
		res.json({
                    status:false,
                    message:"error"
                })
        }
        

    else {

    var num=Math.floor(Math.random() * 1000);
    console.log("Your tracking number is",num);


res.locals.connection.query("update product set tracking_no = ('"+num+"') where customer_id=?",[req.body.cid], function (error, results, fields) {
		if (error) throw error;
    //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
});


     
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
    to: "saminakhan54688@gmail.com",
    subject: "New Order!!!",
    text: "New Request Recieved... check Database ",
};

transporter.sendMail(mailOptions, function(error, info) {
    if (error) console.log(error);
    else console.log("Message sent successfully: " + info.response);
    
res.json({
                  status:true,
                  message:" Done..."
                 });
});

    }
	});
});
module.exports = router;
