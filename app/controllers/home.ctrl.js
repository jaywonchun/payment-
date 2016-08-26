(function(){
	angular
			.module('CoupApp')
			.controller('HomeCtrl', HomeCtrl);

			function HomeCtrl($state, $http){
				console.log("test")
				var homeVm = this;
			
				homeVm.register_btn = "Sign Up";
				
				//binded functions
				homeVm.removeSpace =removeSpace;
				homeVm.open = open;
				homeVm.save = save;

				function removeSpace() {
					console.log(homeVm.username);
					homeVm.username = homeVm.username.split(' ').join('')
				}

				function save (isvalid) {
					console.log("clicked");
					if(isvalid) {
						var user = {
							firstName: homeVm.firstName,
							lastName: homeVm.lastName,
							username: homeVm.username,
							email: homeVm.email,
							password: homeVm.password
						}

					console.log(user)

					
					$http.post('/api/auth/register',user)
						.then(function(res){
							console.log("res", res);
							//config shows original user password
							homeVm.register_btn = res.data.msg;
					})
						console.log("SAVED");
						//$state.go('account');
					}else {
						console.log("FAIL")

						return isvalid;
					}
				}

			



			}
})();


