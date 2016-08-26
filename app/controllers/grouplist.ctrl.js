(function(){
	angular
		.module('CoupApp')
		.controller('listCtrl', listCtrl);

		function listCtrl ($http,Notification, groupSrv) {
			console.log("hello from list")
			var listVm = this;
			listVm.username = localStorage.username;
			listVm.index = -1;
			listVm.groups = [];
			listVm.groupId = '';
			listVm.charges = [];
			listVm.pay = pay;
			listVm.payment_btn= "SUBMIT CHARGE"


////////////////////////////THIS MAY CAUSE PROBLEM

			listVm.isClicked = null;
			listVm.hideoriginal = false;



			//highlight background to let user know its current one


 			listVm.denyLeave = function() {
			 	console.log("LOGGINGFC")
			        Notification.error({message: "There are pending payments! "});
			    };

			listVm.left = function() {
			 	console.log("LOGGINGFC")
			        Notification.success({message: "You left the group! "});
			    };

			listVm.submit = function() {
			 	console.log("LOGGINGFC")
			        Notification.success({message: "Post Submitted! "});
			    };   
  
			
		/*	var string = "foo",
    substring = "oo";*/


			groupSrv.checkGroup().then(function(res){
				if(res.data.length === 0) {
					listVm.hideoriginal = true // ng-hide
					 // ng-show 
					console.log("logging here");
				}else {
					listVm.isClicked = true
				}

				for(i = 0; i < res.data.length; i++) {

					if(res.data[i].Name.indexOf(localStorage.username) !== -1){
						console.log("hi")
						console.log()
						console.log(res);

						//check if any goups present, if they aren't hide the original content


						listVm.groups.push(res.data[i].Name);
						console.log(listVm.groups);

					}
				}
			}); 


	

			listVm.update = update;
			listVm.postCharge= postCharge;
			listVm.uploadTable = uploadTable; 
			listVm.leaveGroup = leaveGroup;
			
		



			function update(members, index) {
				console.log(index);
				listVm.isClicked= false;
				listVm.index = index; 


				listVm.members = members;
				var arrayConvert = members.split(',');
				//console.log(array, "has been clicked");
				groupSrv.getGroup(arrayConvert).then(function(res) {
					listVm.object = res; 
					listVm.balance = res.data[0].Balance; 
					listVm.groupId= res.data[0]._id;
					listVm.charges = res.data[0].charges;
					console.log(listVm.charges)

				//	console.log(res.data[0].groupFriends);
					//why this way?
					listVm.owe = uploadTable(res);

					console.log(listVm.owe, "WTFFFF")

					listVm.sum = calculateSum(listVm.owe); 



					console.log(listVm.sum);
				






				})
			}

			function postCharge() {
				var chargeInfo = {
					amount: listVm.amount,
					description: listVm.description,
					Postedby: localStorage.username,
					showCharge: true
				}	



				groupSrv.postCharge(chargeInfo, listVm.groupId).then(function(res) {
					console.log(res,'getting res');
					listVm.submit();

					return res.data.amount

				})
				.then(function(amount) {
					////////////// REMEMMEVRS TO GET CHARGE AMOUNT AS RETURN PREVIOIUS
				var balance = {$inc:{
					Balance: amount
				}
				}

				groupSrv.updateAmount(balance, listVm.groupId)
				
				.then(function(res){
					console.log("GOT FINAL", res.data.$inc.Balance);
					var postBalance = res.data.$inc.Balance;
					listVm.update(listVm.members); 
					return postBalance;
				})
					
				.then(function(amounts) {
					console.log(listVm.groupId);
					//from route parameter
					
					console.log(amounts, "next step");
					var amount = amounts;
					console.log("amount", amount)

					var currentMembers = listVm.members;
					console.log(currentMembers, "getting current members");
					
//here filter out the one who posted the charge





					//get Names in group and reassign their values
					var parsetoArray = currentMembers.split(',');

					for(i=0; i < parsetoArray.length; i ++) {
						if(localStorage.username === parsetoArray[i]) {
							parsetoArray.splice(i,1);
						
						}
					}

					console.log(parsetoArray, "final array");




					for(x=0; x < parsetoArray.length; x ++) {

						var username = parsetoArray[x] 
						console.log(username, x);
						var updateCharge = {
							oweName: localStorage.username,
							oweAmount: ((amount/currentMembers.split(',').length)),
							groupId: listVm.groupId,
							username: username
						}
							console.log("amount:", amount);
							console.log(currentMembers.split(',').length)
						groupSrv.transaction(updateCharge); 

					}
					listVm.update(listVm.members);	
				})
			})	

		}


					function uploadTable (res) {

							var owe = res.data[0].groupFriends;
							listVm.userOwing = res.data[0].groupFriends;
							console.log(owe);
							for(i =0; i < owe.length; i++) {
								console.log(owe[i].username);
								//gets 
								if(owe[i].username == localStorage.username) {
									console.log("INSIDE IF")
									console.log(owe[i])
									//use it for later to delete 
									listVm.currentObj = owe[i];
									return owe[i].owe;
								}

							}
						}

					function calculateSum(res) {
						var sum = 0;
						for(i = 0; i < res.length ; i++) {
							sum = sum+ res[i].oweAmount;
							console.log(res[0])
						}

						return sum

	
					}

					function pay () {
						console.log(listVm.sum);

						var balance = {$inc:{
		//change THISSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
							Balance: -listVm.sum
							}
						}


				groupSrv.updateAmount(balance, listVm.groupId)
				
				.then(function(res){
					console.log("GOT FINAL", listVm.owe);

					var inner = listVm.currentObj._id;
					var outer = listVm.groupId ;
						
					//groupSrv.clearPayment(id, outerId);
						console.log(listVm.owe);

						for (i=0; i < listVm.owe.length; i ++) {
						var deleteId = listVm.owe[i]._id;
					
						var ids = {
								innerId : inner,
								outerId : outer,
								positionId: deleteId
						}
						

						
						groupSrv.clearPayment(ids);

					}





				}).then(function(res){
					update(listVm.members);
				})
			 }

			 	function leaveGroup() {
			 		//var theyoweyou = true;
			 			console.log(listVm.userOwing);
			 			console.log(listVm.groupId);

			 		var proceeedleave = true;
			 		var count = 0;
			 	//	console.log(listVm.userOwing)

			 		if(listVm.userOwing === undefined || listVm.userOwing === null  ) {
			 			count === 0
			 		}else {
			 		
			 		for(i = 0; i < listVm.userOwing.length; i ++){
			 			console.log("hereee")
			 			count += listVm.userOwing[i].owe.length
			 			//console.log(listVm.userOwing[i].owe.[0].oweName)		 			
			 		}
			 	}
			 			console.log(count, "COUNTTTT");
			 			console.log("fsdfd")

			 		if(count === 0) {
			 			console.log("now you are leaving for good", count)
			 				$http.delete('api/group/deletegroup' + listVm.groupId)
			 				.then(function(res){
			 					console.log("deleted")
			 					listVm.left();

			 					//updating group list 


						console.log(listVm.groups);

			 		groupSrv.checkGroup().then(function(res){
			

			
					

					listVm.groups = getNewGroup(res);

			









					})










			 				}, function (error) {
			 					console.log("couldnt delete ", error)
				 				
			 				})










			 		}else{
			 			console.log("cant leave", count)
			 			listVm.denyLeave();
			 			return false;
			 		}

			 	}


				function getNewGroup(res) {
					console.log("getting new")
				   var updatedGroup = [];

						for(z = 0 ; z < res.data.length; z ++) {
							var groupName = res.data[z].Name;
							console.log(groupName);
							updatedGroup.push(groupName);
						}

						return updatedGroup;
					}
				
		}
})()

