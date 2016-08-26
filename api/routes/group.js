var Group = require('./../models/Group');
var router 	= require('express').Router();



router.post('/' , function (req, res) {
	var groupDetails = req.body;
	console.log("hello group", req.body);

	var groupUser = Group(groupDetails);
	groupUser.save(function(err) {

		if(err) {
			console.log(err);
	        res.status(400).json({err:err})
		}else {
			console.log("Group Created");
			res.json({group :groupUser, msg:'Group Created'});

		}
	})
  	

});



router.get('/verify/:username',function(req,res){
	//console.log("in friendsusername.js" + req)
	Group.find({"groupFriends.username": req.params.username})
	.then(function(user){
		//console.log("Getting......friends" , user)
		res.json(user);
	})
})

router.get('/confirm/:confirm',function(req,res){
	//console.log("helloo")
	 var arrayConvert = req.params.confirm.split(',');
	console.log("group get.....", req.params.confirm)


	//console.log("in friendsusername.js" + req)
	Group.find({"Name": req.params.confirm})
	.then(function(user){
		//console.log(user, "what")
	//	console.log("Getting......friends" , user[0].friends)
		res.json(user);
	})
})

router.put('/charge/:id', function (req, res) {
	console.log("in here")
	var chargeInfo = req.body;
	console.log("hello charge", chargeInfo);
	console.log("????", req.params.id)
	var query = {"_id": req.params.id}

 			/*{$push: { 
                        "charges":{ "amount": 5,"description":"some beer", "Postedby": "John", "showCharge": "true" } 
                      }
             }
*/

	Group.update(query,{$push: { 
          "charges":{ "amount": chargeInfo.amount,
          			  "description": chargeInfo.description, 
          			  "Postedby": chargeInfo.Postedby, 
          			  "showCharge": chargeInfo.showCharge } 
           }
      }
, {chargeInfo} ,function(err,object){
		if(err){
			console.log(err);
			res.status(400)
			   .json({err:err})
		}
		else{
			res.json(chargeInfo);

		}
	});



});

router.put('/balance/:id', function (req, res) {
	var chargeInfo = req.body;
	console.log("hello amounttttttttttttttttttttt", chargeInfo);
	console.log("????", req.params.id)
	var query = {"_id": req.params.id}
	/*var update = {


	}*/

	Group.update(query, chargeInfo
, {} ,function(err,object){
		if(err){
			console.log(err);
			res.status(400)
			   .json({err:err})
		}
		else{
			res.json(chargeInfo);

		}
	});



});

router.put('/transaction/', function (req, res) {
	var transactionInfo = req.body;

	var username = transactionInfo.username;
	var groupId = transactionInfo.groupId;

	var updateField = {

		oweName: transactionInfo.oweName,
		oweAmount: transactionInfo.oweAmount
		
	}



	console.log(username, "USERRRR");
	console.log(updateField, "UPDATINGGGG");

	Group.findOne({"_id": groupId},function(err,object){
		if(err){
			console.log("couldnt find")
		}
		else{
			console.log("found the id");

					var query = {"_id": groupId, "groupFriends.username": username}
					console.log(username, "GOT USERNAME");


					var updateField = {
						oweName: transactionInfo.oweName,
						oweAmount: transactionInfo.oweAmount
					}


					Group.update(query,
						{"$push": 
						{"groupFriends.$.owe":
					      		{ "oweName": transactionInfo.oweName,
					      		  "oweAmount": transactionInfo.oweAmount 
					      	}
					       }
					  }
					, {} ,function(err,object){
						if(err){
							console.log('ERROR OH NO')
							console.log(err);
							res.status(400)
							   .json({err:err})
						}
						else{
							console.log('ALL GOOD')
							res.json(object);
							console.log(object);

						}
					});

		}
	})

});




router.put('/delete/', function (req , res){

  var innerId = req.body.innerId;
  var outerId = req.body.outerId;
  var deleteId= req.body.positionId;

console.log(deleteId);
 
 var query = {"_id": outerId, "groupFriends._id": innerId}



	Group.update(query,
					{"$pull": 
						{"groupFriends.$.owe":
					      		{ "_id": deleteId
					      		
					      	}
					       }
					  }
		,function(err,object){
		if(err){
			console.log(err);
			res.status(400)
			   .json({err:err})
		}
		else{
			res.json(object);
		}
	});

})


router.delete('/deletegroup:id/' ,function(req,res){

	Group.remove({ _id: req.params.id}, function(err, object) {
    	if(err){
       		 console.log("ERROR!", err);
    	}else {
    		console.log("deleted  ");
    		res.json(object);

    	}

});

});
	





















module.exports = router;






/*Group.find({"_id": req.params.id}, function(err, group) {
    if (err) {
        console.log(err);
    } else {
console.log(group[0], "GOTEM")
    	group[0].charges = chargeInfo
				var newObject = Group(group[0]);
					newObject.save(function(err){
						if(err){
							console.log(err);
							res.status(400)
							   .json({err:err})
						}
						else{
							res.json(group[0])
							console.log("success");
						}
					})
        
    }
});



*/
