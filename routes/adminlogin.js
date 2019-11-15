var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

router.post('/',function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    res.header('Access-Control-Allow-Headers: x-my-custom-header');
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
  // var email=req.body.email
   console.log(req.body);
   
   
    res.locals.connection.query('SELECT * FROM admin WHERE email = ?',[req.body.email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
        
            })
      }else{
        if(results.length >0){
            if(req.body.password==results[0].password){
              
              
               res.json({
                    status:true,
                    message:'successfully authenticated',
                    
                })
            }else{
                res.json({
                  status:false,
                  message:"Email and password does not match"
                 });
            }
         
        }
        else{
          res.json({
              status:false,    
            message:"Email does not exits"
          });
        }
      }
    });
})
module.exports = router;