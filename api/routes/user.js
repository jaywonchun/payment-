var Users = require('./../models/Users');
var router 	= require('express').Router();

//only works when its first
router.get('/all',function(req,res){
	//console.log("in user.js" + req)
	Users.find({})
	.then(function(user){
		console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEEEEEEEEEEEEEEEEEEEEEEEEEEAAAAAAAAA")
		//console.log("Getting......" , user)
		res.json({fa:user});
	})
})


//get all users
router.get('/:username',function(req,res){
	console.log("in SEEEEEEEEEEEEEEEEEECPMMMDDDDDDDDDDDDDDDDDDD.js")
	Users.find({"username": req.params.username})
	.then(function(user){
		//console.log("Getting......" , user)
		res.json({user:user});
	}, function(err) {
		console.log(err);
	})
})





router.get('/friends/:username',function(req,res){
	//console.log("in friendsusername.js" + req)
	Users.find({"username": req.params.username})
	.then(function(user){
	//	console.log("Getting......friends" , user[0].friends)
		res.json({friends : user[0].friends});
	})
})

/*router.get('/token/:username',function(req,res){
	console.log("in token" + req)
	Users.find({"username": req.params.username})
	.then(function(user){
		console.log("Getting......friends" , user[0].friends)
		res.json({friends : user[0].friends});
	})
})
*/





router.post('/addfriend', function(req, res) {
		var __friend = req.body;
	//	console.log(__friend, "FRIENDSSSSS")
		Users.find({"username": __friend.username})
		.then(function(user){
				console.log("Found it", user[0])
				//console.log(__friend.friend, "HUHH");
				var validate = true;	
				for (i = 0; i < user[0].friends.length; i ++) {
					if(user[0].friends[i] === __friend.friend){
						var validate = false; 
						res.status(400).json({err:err});
						return
					}
			}
			if(validate == true){
			console.log("err", __friend.friend);


			user[0].friends.push(__friend.friend);
			console.log(user[0])
			}

			

//console.log(user[0].friends, "FFFFFFFFFFF");


			var bff = Users(user[0]);
			
			bff.save(function(err) {
	        			if(err){
	        				console.log(err);
	        				res.status(400).json({err:err})
	        			}
	        			else {
						console.log("FRIEND SAVED"); 
	        			res.json({user:user[0],msg:'Friend updated'});
/*						console.log("red", res.json(__user));
*/	        			//res.json({user:user[0].friends,msg:'Friend updated'});

	        			}
	        		})   



		})

});

//add group properties to user
router.put('/group' , function (req, res) {
      console.log("In puttt")
      var groupDetails = req.body;
	console.log("hello group in user", groupDetails);

	var update = {
			groupId: groupDetails.property1,
			isAdmin: groupDetails.isAdmin,
			groupFriends: groupDetails.friends
		}

var query = {"username": groupDetails.username}
	Users.update(query,update,{},function(err,object){
		if(err){
			console.log(err);
			res.status(400)
			   .json({err:err})
		}
		else{
			res.json(object);
		}
	});

});



   















//delete test accounts via url bar
router.get('/remove/:userId',function(req,res){
	var where = {where:{id:req.params.userId}}
	models.Users.find(where).then(function(user){
		user.destroy();
		res.json({
			deleted:true
		});	
	});
});







module.exports = router;


/*	bff.save(function(err) {
					if(err) {
						console.log("error!!", err);
						res.status(400)
						}else{
						console.log("success");
						res.json({friendz :user,msg:'Friend Added'});
							
				}
			})*/