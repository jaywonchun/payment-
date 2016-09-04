
(function() {

  angular
    .module('CoupApp')
    .controller('ModalInstanceCtrl', ModalInstanceCtrl);

   function ModalInstanceCtrl ($uibModalInstance, items, $http, $state) {
    console.log("HELLO");
    var modalVm = this; 
    modalVm.showWarning = false; 
    modalVm.auth_btn ="Login";
    modalVm.items = items;
    modalVm.authenticate = authenticate;
    modalVm.ok = ok;
    modalVm.cancel = cancel; 
   
    
   function ok () {
      $uibModalInstance.close(modalVm.selected.item);
    };


    function cancel(){
      $uibModalInstance.dismiss('cancel');
    };



  
         function authenticate(){
          console.log("auth clicked");

            var user = {
              username:modalVm.username,
              password:modalVm.password
            }

            console.log(user);
             user = JSON.stringify(user);
             //request checked from interceptor 
            $http.post('/api/auth/authenticate',user)
            .then(function(res){
              console.log("post request returned")
              console.log(res);
              var authToken = res.headers().authentication;
              if (authToken != null) {

                localStorage.username = modalVm.username;
                console.log("usernameFound", localStorage.username)
             $uibModalInstance.close();
                $state.go('navUser.account', {'username': modalVm.username});
              }

        

              console.log("authToken", authToken);
              

              //move to anothre state once response is back

            }, function(err){
              console.log(err)
             modalVm.showWarning = true;

            })
          }


};


})();

