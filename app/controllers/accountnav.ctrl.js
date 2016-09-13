(function(){
	angular
		.module('CoupApp')
		.controller('accountNavCtrl', accountNavCtrl);

		function accountNavCtrl ($http, $state, $window, groupSrv,$window, user) {
			var accountVm = this;
			accountVm.friendlist = [];
			accountVm.name = localStorage.username;
			accountVm.signOut = signOut;
			accountVm.gotocc = gotocc;
		



/*			console.log("resolving", user);
*/
		/*	for(i = 0; i < user.data.length; i ++) {
				var test =user.data[0].charges.length;
				console.log("IIIIIIIIIIIIIIIIIII" , i)
				for(  x = 0; x <  user.data[i].charges.length; x ++ ) {
					console.log(user.data[i].charges[x].Postedby)
					var payTo = user.data[i].charges[x].Postedby;

				}
			}*/

			function signOut(){
				
				if(localStorage.authToken != '' || localStorage.authToken != undefined){
					//localStorage.authToken.clear(); 
					localStorage.clear(); 

					$state.go('nav.home');

							 			//$state('account');
				}
			}

			function gotocc() {		
				if(localStorage.authToken != '' || localStorage.authToken != undefined){
					//localStorage.authToken.clear(); 
					$state.go('navUser.card')
							 			//$state('account');
				}				
			}

			function showNotif() {
				accountVm.isTrue = true;
			}

	

		


		}
})()