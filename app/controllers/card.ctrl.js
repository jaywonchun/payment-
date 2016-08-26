(function(){
	angular
		.module('CoupApp')
		.controller('cardCtrl', cardCtrl);

		function cardCtrl ($http, userSrv, Notification) {

		var cardVm = this;
		
		/*cardVm.month = function(){
			console.log(cardVm.expmonth)
		}

		*/

		 cardVm.err = function() {
		        Notification.error({message: "Your credit card number is not valid ", delay: 10000});
		    };

	 cardVm.success = function() {
		        Notification.success({message: "Success! You are good to go ", delay: 10000});
		    };


		cardVm.savecc = savecc;

		function savecc() {
		console.log("clicked cc");
		
			var cc = {
				number: cardVm.number,
				exp_month: cardVm.expmonth,
				exp_year: cardVm.expyear,
				cvc: cardVm.cvc
			}

		console.log(cc)

			userSrv.ccinfo(cc).then(function(res) {
				//only if cc was gotten
				if(res) {
					cardVm.success();

					console.log("got the cc info!", res)
					//check db if cc token exists , if not , add it 
					var cc = {
						username: localStorage.username,
						token: res
					}

					console.log("token found");

					$http.post('api/token/check', cc)
					.then(function(res){
						console.log("added it" , res)
					})

				}else {

					console.log("failed");
					cardVm.err()
				};

			});

		}
	}

})();