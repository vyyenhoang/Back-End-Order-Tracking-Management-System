var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
	// var bid=req.body.bid;
	// var bname=req.body.bname;
	// var url=req.body.url;
	// var logo=req.body.logo;
	// var bfolder=req.body.bfolder;
	// console.log(bname);
	res.locals.connection.query("insert into orders values (?,?,?,?,?,?)",[req.body.pid,req.body.cid,req.body.trackno,req.body.email,req.body.status,req.body.info], function (error, results, fields) {
		// if (error) throw error;
		// console.log("1 record inserted");
		// res.send(JSON.stringify({"status": 200, "error": null, "response": results}));


if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
        
            })
}
else{
    
              
              
               res.json({
                    status:true,
                    message:'inserted',
                    
                })
            }


	});
});
module.exports = router;
