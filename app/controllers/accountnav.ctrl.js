(function(){
	angular
		.module('CoupApp')
		.controller('accountNavCtrl', accountNavCtrl);

		function accountNavCtrl ($state) {
			var accountVm = this;
			accountVm.name = localStorage.username;
			accountVm.signOut = signOut;
			accountVm.gotocc = gotocc;

			function signOut(){
				
				if(localStorage.authToken != '' || localStorage.authToken != undefined){
					//localStorage.authToken.clear(); 
					localStorage.clear(); 

					$state.go('nav.home')
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
			

			



		}
})()