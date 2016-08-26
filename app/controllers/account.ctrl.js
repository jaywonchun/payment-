(function(){
	angular
		.module('CoupApp')
		.controller('AccountCtrl', AccountCtrl);

		function AccountCtrl ($http, user, $stateParams, groupSrv) {
			console.log("hello from account")
			var accountVm = this;
			accountVm.user = $stateParams.username;
			accountVm.username = localStorage.username;

			accountVm.groups = ["hello", "hi"];
			
			groupSrv.checkGroup().then(function(res){
				for(i = 0; i < res.data.length; i++) {
					accountVm.groups.push(res.data[i].Name);
				}

			}); 
	



		}
})()