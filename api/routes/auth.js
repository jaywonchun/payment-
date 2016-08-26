var Users = require('./../models/Users');
var bcrypt = require('bcryptjs');  
var jwt = require('jsonwebtoken');
var router = require('express').Router(); 


router.post('/register' , function (req, res) {
	var __user = req.body;
		console.log("hello", req.body);
	
/*	__user.password= "";
*/
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(__user.password, salt, function(err, hash){
  			 if(!err){
	        	/*
	                                       	the resulting hash produced contains an encrypted
	        	password and some information on how to decode the
	        	password that only bycrypt knows.
	        	*/
	        	__user.password = hash;

	        	var user = Users(__user);
	        		user.save(function(err) {
	        			if(err){
	        				console.log(err);
	        				res.status(400).json({err:err})
	        			}
	        			else {
	        				console.log("user password", __user.password);
						console.log("password!!!", user.password); 
	        			res.json({user:user,msg:'Account Created'});
/*						console.log("red", res.json(__user));
*/
	        			}
	        		})   	
		   
	        }
		});
	});
});






router.post('/authenticate',function(req,res){
	console.log('Authentication Endpoint');
	var __user = req.body;
	console.log(__user);
	Users.find({"username":__user.username})
	.then(function(user){
		console.log("user", user)

		 if(user.length == 0) {
		    	console.log("nothing")
				res.status(403)
		    		.json('us not found');
		}
		/*	
		In order to log a user in, the user record is retrieved
		from the database based on their email. This is why it is important
		to have a UNIQUE constraint on the email property so you can't have
		two users with the same email entered in the database. The encrypted 
		password is retrieved from the database and the bycrypt compare function
		is run to see if the user entered the correct password. The function uses
		the encryption instructions stored as part of the password hash to encrypt
		the password the user just entered on log in. If the two encrypted strings match
		at the end, the password is deemed correct and the user is allowed in.
		*/
		bcrypt.compare(__user.password, user[0].password , function(err, result) {
			console.log("user password",__user.password);
			console.log("hash password", user[0].password);
			console.log(result);
		   
		    // res == true ;
		    if(result==true){
		    	user.password = '';
		    	delete user.password;
		    	var user_obj = {username:user[0].username};
				var token = jwt.sign(user_obj,'coupKey');

				res.set('authentication',token);
				console.log(user_obj)
		    	res.send(user_obj)
		    }
		    else{
		    	res.status(403)
		    		.json({err:'unauhthorized'});
		    }
		});
		
	})

})
module.exports = router;