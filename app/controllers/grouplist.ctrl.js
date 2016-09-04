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
			listVm.isClicked = null;
			listVm.hideoriginal = false;



			//highlight background to let user know its current one


 			listVm.denyLeave = function() {
			        Notification.error({message: "There are pending payments! "});
			    };

			listVm.left = function() {
			        Notification.success({message: "You left the group! "});
			    };

			listVm.submit = function() {
			        Notification.success({message: "Post Submitted! "});
			    };   
  
			

			groupSrv.checkGroup().then(function(res){
				if(res.data.length === 0) {
					listVm.hideoriginal = true // ng-hide
					 // ng-show 
				}else {
					listVm.isClicked = true
				}

				for(i = 0; i < res.data.length; i++) {

					if(res.data[i].Name.indexOf(localStorage.username) !== -1){

						//check if any goups present, if they aren't hide the original content

						listVm.groups.push(res.data[i].Name);

					}
				}
			}); 


	

					listVm.update = update;
					listVm.postCharge= postCharge;
					listVm.uploadTable = uploadTable; 
					listVm.leaveGroup = leaveGroup;
			
		

			function update(members, index) {
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

					//console.log(listVm.owe, "WTFFFF")

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
					var postBalance = res.data.$inc.Balance;
					listVm.update(listVm.members); 
					return postBalance;
				})
					
				.then(function(amounts) {
					console.log(listVm.groupId);
					//from route parameter
					
					var amount = amounts;

					var currentMembers = listVm.members;
					
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

			 		var proceeedleave = true;
			 		var count = 0;
			 	//	console.log(listVm.userOwing)

			 		if(listVm.userOwing === undefined || listVm.userOwing === null  ) {
			 			count === 0
			 		}else {
			 		
			 		for(i = 0; i < listVm.userOwing.length; i ++){
			 			count += listVm.userOwing[i].owe.length
			 			//console.log(listVm.userOwing[i].owe.[0].oweName)		 			
			 		}
			 	}

			 		if(count === 0) {
			 				$http.delete('api/group/deletegroup' + listVm.groupId)
			 				.then(function(res){
			 					listVm.left();

			 					//updating group list 



			 		groupSrv.checkGroup().then(function(res){

					listVm.groups = getNewGroup(res);

					})

			 				}, function (error) {
			 					console.log("couldnt delete ", error)
				 				
			 				})



			 		}else{
			 			listVm.denyLeave();
			 			return false;
			 		}

			 	}


				function getNewGroup(res) {
				   var updatedGroup = [];

						for(z = 0 ; z < res.data.length; z ++) {
							var groupName = res.data[z].Name;
							updatedGroup.push(groupName);
						}

						return updatedGroup;
					}
				
		}
})()


