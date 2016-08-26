(function(){

	angular
		.module('CoupApp', [

			'ngAnimate',
			'ui.router', 
			'ui.bootstrap', 
			'ngMessages', 
			'angular-jwt',
			'ngAnimate',
			'angularPayments',
			'ui-notification'
/*			'angular-stripe'
*/		]);

	angular
		.module('CoupApp')
		.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
			$urlRouterProvider.otherwise('nav/home');

			$stateProvider
				//state for home
				
				.state('nav', {
					url: '/nav',
					templateUrl: 'partials/nav.html',
					controller: 'HomenavCtrl as ctrl',
					
				})

				.state('nav.home', {
						url: '/home',
						templateUrl:'partials/home.html',
						controller: 'HomeCtrl as ctrl'
							
				})

				//state for account

				.state('navUser', {
					url: '/navAccount',
					templateUrl: 'partials/navUser.html',
					controller: 'accountNavCtrl as ctrl',
					resolve:{
							user:function($state){
									if(localStorage.authToken == '' || localStorage.authToken == undefined){
										console.log("resoliving in if")
							 			$state('nav.home');
									}
								}
							 }					
				})

				.state('navUser.card', {
					url: '/card',
					templateUrl: 'partials/card.html',
					controller: 'cardCtrl as ctrl',
					resolve:{
							user:function($state){
									if(localStorage.authToken == '' || localStorage.authToken == undefined){
										console.log("resoliving in if")
							 			$state('nav.home');
									}
								}
							 }					
				})


		
				.state('navUser.addcoup', {
					url: '/coup',
					templateUrl: 'partials/addCoup.html',
					controller: 'coupCtrl as ctrl',
					resolve:{
							user:function($state){
					//				console.log("resolving");
									if(localStorage.authToken == '' || localStorage.authToken == undefined){
										console.log("resoliving in if")
							 			$state('nav.home');
									}
								}
							 }
					})






  .state('navUser.account', {
       	url: '/myAccount/:username',
       	controller: 'AccountCtrl as ctrl',
        views: {

            // the main template will be placed here (relatively named)
            '': { templateUrl: 'partials/account.html' },

            // the child views will be defined here (absolutely named)
            'friendlist@navUser.account': 
            { templateUrl: 'partials/groupList.html',
              controller: 'listCtrl as ctrl'
        	},

            // for column two, we'll define a separate controller 
            'groupdetails@navUser.account': { 
                templateUrl: 'partials/groupdetails.html'
               // controller: 'detailCtrl as ctrl'
            }
        }
        
    });










	/*			.state('navUser.account.group', {
						url: '/group',
						templateUrl:'partials/group.html',
						controller: 'groupCtrl as ctrl', //no resolve error if no ctrler
						resolve:{
							user:function($state){
									console.log("resolving");
									if(localStorage.authToken == '' || localStorage.authToken == undefined){
										console.log("resoliving in if")
							 			$state('nav.home');
									}
								}
							 }
				})*/


				
			
	/*			.state('navUser.addcoup', {
					url: '/coup',
					templateUrl: 'partials/addCoup.html',
					controller: 'coupCtrl as ctrl',
					resolve:{
							user:function($state){
					//				console.log("resolving");
									if(localStorage.authToken == '' || localStorage.authToken == undefined){
										console.log("resoliving in if")
							 			$state('nav.home');
									}
								}
							 }
				})*/

				
/*  <link rel="stylesheet" type="text/css" href="searchcss/searchMeme.css">
<link rel="stylesheet" type="text/css" href="searchcss/demo.css">*/
			

		$httpProvider.interceptors.push(function(jwtHelper){
			return {
				request:function(config){
					//console.log('Requests');
					/*
					config is the global object that the data
					is attached to, its console logged below 
					so you can see it
					*/
					//console.log(config);

					/*
					here we check if a the authoken is saved in 
					localStorage, and if is, it is attached to the
					outbound header to be sent off wherever
					it needs to go
					*/
					if(localStorage.authToken != undefined){
						config.headers.authentication = localStorage.authToken;
					}
					return config;
				},
				response:function(response){
					//console.log('Response');
					/*
					the incoming response object is intercepted here
					and its header is checked for an authentication 
					property. This property was attached by our own api
					and it contains the Json Web Token
					*/
					var auth_token = response.headers('authentication');
				//	console.log(auth_token);
					/*
					if there is a web token it is decoded below to check
					the payload. In this case we are checking that it contains
					an email property, becase that is set by our API when the
					user logs in. If it does, we know that this token did 
					come from our api and we store it in localStorage.
					The reason it is stored is because in order to access
					other parts of the API data, our server will require that
					all inbound requests it recieves (re the code above), contains
					a valid token so that it can TRUST the client requesting
					the data has been authorized at some point. In this case, 
					an authorization key in the form of JWT is passed when the
					user authenticates as part of logging in
					*/
					if(auth_token){
						var decrypt_token = jwtHelper.decodeToken(auth_token);
						console.log(decrypt_token);
						if(decrypt_token.username){
							localStorage.authToken = auth_token;
						}
						
					}
					return response;
				}
			}
		})















		});



})();

	/*
		The HTTP Interceptor is a service built into angular
		that intercepts every http requests made to and from
		the client. Every time you send a request out to your own
		api, or any API for that matter, the JSON object you send
		, from anywhere in your code, will pass through the 
		request property of the object below. The same is true for any 
		incoming request.
		*/