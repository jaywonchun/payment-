(function(){
	angular
			.module('CoupApp')
			.controller('HomenavCtrl', HomenavCtrl);

			function HomenavCtrl($state, $http, $uibModal){
				var navHomeVm = this;
			
				
				//binded functions
				navHomeVm.open = open;
				 navHomeVm.animationsEnabled = true;

				function open(size) {
console.log("opening")
				  var modalInstance = $uibModal.open({
				      animation: navHomeVm.animationsEnabled,
				      templateUrl: 'partials/loginModal.html',
				      controller:'ModalInstanceCtrl as ctrl',
				      size: size,
				      resolve: {
				        items: function () {
				          return navHomeVm.items;
				        }
				      }
				    });

				    modalInstance.result.then(function (selectedItem) {
				      navHomeVm.selected = selectedItem;
				    });
				  

				    navHomeVm.toggleAnimation  = function () {
				    navHomeVm.animationsEnabled = !navHomeVm.animationsEnabled;
				  };
				}

			}
})();


