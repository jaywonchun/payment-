(function(){
	angular
		.module('CoupApp')
		.controller('coupCtrl', coupCtrl);

		function coupCtrl ($http, Notification, userSrv, $state) {
			var coupVm = this;
			coupVm.count = 0; 
			coupVm.friends = [];
			coupVm.localfriends= [{
				username: localStorage.username
			}];

			coupVm.disable = false; 
			


		/*	$http.get('/api/user/' + localStorage.username)
		            .then(function(res){
		             console.log(res, "ALL")
	                }, function(error) {
	                    console.log('Could not GET ALL', error);
	                    });

*/



			userSrv.getFriends().then(function(res){
				console.log("freinds res", res);
			
				console.log("log")
				coupVm.friends = userSrv.friends

				
					console.log(coupVm.friends, "Final friends")

		
			});
		


	
			
			console.log("hi from coup ctrl");
			
			userSrv.getUser(localStorage.username).then(function(res) {
				console.log(coupVm.friends);
				console.log("Heree")
				//console.log("got user", res.data.user[0].token);
				if(res.data.user[0].token === undefined) {
					coupVm.primary();
					coupVm.disable = true;

				}

			})
  		

		    coupVm.findUser= findUser;
		    coupVm.ifempty= ifempty;
		    coupVm.updateFriends = updateFriends;
		    coupVm.createGroup = createGroup;
		    coupVm.disableSearch = disableSearch;

		    //coupVm.myFunc = myFunc;
		  

			 coupVm.primary = function() {
			 	console.log("LOGGINGFC")
			        Notification.error({message: "You can't add groups until you provide your payment info ", delay: 10000});
			    };

 			coupVm.warning = function() {
			 	console.log("LOGGINGFC")
			        Notification.warning({message: "You already added this friend "});
			    };

			    coupVm.denygroup = function() {
			 	console.log("LOGGINGFC")
			        Notification.error({message: "You must select at least one person! "});
			    };


			function findUser () {
				console.log("loading users");
				var array = ['john', 'jack']
console.log(coupVm.friends);
console.log(array);
console.log(coupVm.friends.length);
					for(t = 0; t < coupVm.friends.length; t++) {
						console.log(coupVm.friends[t])
					if(coupVm.username === coupVm.friends[t]) {
						console.log("herefdsf")
						//console.log(coupVm.username);
						//console.log(coupVm.friends[t].username)
						return;
					}
			
					};
				$http.get('/api/user/' + coupVm.username) //request made from intereptor 
					.then(function(user) {
						console.log(user);
						console.log("loading user", user.data.user[0].username);
						console.log(coupVm.friends , "ULTIMATE LIST");

					// ***************************************// array length 0 but has 2	

						/*if(coupVm.friends.length === 0) {
							console.log("WTFFFF")
						coupVm.friends.push( user.data.user[0].username);
						console.log(coupVm.friends)
						}*/

						var isMatch = true;

						for(i =0; i < coupVm.friends.length; i ++) {
							if(coupVm.friends[i].name === user.data.user[0].username) {
								var isMatch = false;
							}
						}

						if(isMatch){
							coupVm.friends.push( user.data.user[0].username);
						}else {
							return
						}




					}, function(error) {
        				console.log('Could not get user', error);
   				 });
			}



			function ifempty() {
				if(coupVm.username != null) {
					coupVm.friends.splice(0,1) ;
					//console.log(coupVm.friends, "array");
				}
			}

		

			function updateFriends(bestie) {
					var notif = false;
				for(t = 0; t < coupVm.localfriends.length; t++) {
					if(bestie === coupVm.localfriends[t].username) {
						notif = true;
					}
					if(notif === true){
						coupVm.warning();


					};
				}


			
				//make object in schema format
			console.log(bestie);

				console.log(coupVm.friends);
				
				var objStyle = {
					username: bestie
				}

				var noduplicate = false;
				for(m = 0; m < coupVm.localfriends.length; m++) {
 					//console.log(coupVm.localfriends);
					if(coupVm.localfriends[m].username == bestie) {
						
							noduplicate= true;
					}
				}

					if(noduplicate === false) {
						coupVm.localfriends.push(objStyle);
					}
				
				console.log(coupVm.localfriends);







				for(i = 0 ; i < coupVm.localfriends.length; i ++){
					if(coupVm.localfriends[i].name === bestie) {
						coupVm.friends[i].shouldIdisable = true; 
						console.log(coupVm.friends[i].shouldIdisable)
	
							console.log(coupVm.friends[i])						

					}
				}

////////

		
console.log(coupVm.localfriends)
console.log(coupVm.friends)
				
				console.log(coupVm.localfriends, "local")
				//console.log("clicked", bestie);
				userSrv.addtoGroup(bestie). then (function(res) {
					//coupVm.friends = userSrv.friends;
					//console.log(coupVm.friends, "track of freinds")
                 coupVm.friends = userSrv.friends; 





				});

				 




			}

			function createGroup() {
			console.log("creating group");
			
				console.log(coupVm.friends)
				if(coupVm.localfriends.length > 0) {
					console.log(coupVm.localfriends.length);
					var secret = localStorage.username + "/" + Math.random().toString(36).slice(2);
					console.log(coupVm.localfriends, "initiated")

					var nameArray = [];


					//console.log(coupVm.localfriends)
					//get usernames and push it to array
					for(i = 0; i < coupVm.localfriends.length; i++) {
						nameArray.push(coupVm.localfriends[i].username);

					}
					var edit = nameArray.toString();
					//console.log(edit);

					var initializeGroup = {
				 		
	            		groupId : secret,
	            		groupFriends: coupVm.localfriends,
	            		Charges: 0,
	            		Balance: 0,
	            		Name: edit

/*

    groupFriends:[{
        username: String,
        owe:[{
            oweName: String,
            oweAmount: Number
        }]
    }],*/
//name is not in array format
        			}					

	 					$http.post('/api/group/', initializeGroup)
			         	   .then(function(res){


			           		  console.log(res, "gg");
			           		   $state.go('navUser.account');

			             /*	var info = {
		            		invitor : localStorage.username ,
		            		invitee : coupVm.localfriends,
		            		code: secret
	        				 }
			        		console.log('EMITTING' + coupVm.socket.id);
							coupVm.socket.emit('friendrequest', info);
*/

	                }, function(error) {
	                    console.log('Could not reach endpoint', error);
	                    });

		     	
		     

		           
				}else {
					coupVm.denygroup();
					return;
				}
			}

				function disableSearch() {
					console.log(coupVm.username);
console.log(coupVm.friends);
				for(t = 0; t < coupVm.friends.length; t++) {
					//console.log(coupVm.friends[t]);
					if(coupVm.username === coupVm.friends[t]) {
						console.log("sameee")
						console.log(coupVm.disable);
					}else {
						console.log("Wtf")					
					}
					


					};
				}

				



		}
})(); 


//if cc on file, by default set that as future payments, you can add and change in myaccontstab