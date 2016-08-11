(function(){

	angular
		.module('CoupApp', ['ui.router']);

	angular
		.module('CoupApp')
		.config(function($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('nav/home');

			$stateProvider

				.state('nav', {
					url: '/nav',
					templateUrl: 'partials/nav.html'
					/*controller: 'NavCtrl as ctrl',*/
				})

				.state('nav.home', {
						url: '/home',
						templateUrl:'partials/home.html'
/*						controller: 'HomeCtrl as ctrl'
*/					})
			
		});

})();

