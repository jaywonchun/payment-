(function(){
    
    angular
        .module('CoupApp')
        .service('userSrv', UserService)

    function UserService($http) {
        var self = this;
        //private variable

        //public functions
        


       

        self.getFriends = getFriends;
        self.addtoGroup = addtoGroup;
        self.ccinfo = ccinfo;
        self.getUser = getUser;

        function getUser(username) {
            return $http.get('/api/user/' + username) //request made from intereptor 
                    .then(function(user) {
                     //   console.log("loading user", user);
                        return user
                    }, function(error) {
                       // console.log('Could not get user', error);
                 });
        }

        function getFriends() {

        console.log("up in service" + localStorage.username);
        return $http.get('/api/user/friends/' + localStorage.username) //request made from intereptor 
            .then(function(user) {
                self.friends = []; 
            //    console.log("service user", user);
                //no responsez
            self.friends = user.data.friends;
            //    console.log(self.friends);
                
               
                //console.log(self.friends, "Final friends");
                return self.friends;

            }, function(error) {
                console.log('Could not retrieve friends', error);
         });

        }

        function addtoGroup(bestie){
           console.log(self.friends, "friends work?")
           console.log(bestie);

                        var verify = {
                        friend: bestie,
                        username: localStorage.username
                    }


                   return $http.post('/api/user/addfriend/', verify)
                        .then(function(res){
                            console.log(res)
                          //  console.log("friend added", res.data.user.friends);
                         //   console.log("friends length", res.data.user.friends.length);
                            self.friends = [];
                            //config shows original user password
                         //   console.log(res.data.user);


                        


                        self.friends = res.data.user.friends;
                        console.log(self.friends, "RETURNNNN")

                        return self.friends
                            }, function(error) {
                               console.log('Could not add friend', error);
                            });
             // return res.data.user                      

        }

        function ccinfo(cc) {
        return $http.post('/api/token/', cc)
            .then(function(res){
                console.log("CCres", res);
                //config shows original user password
                    var confirmCCLater= res.data.id;
                    console.log("CARD UPDATED", confirmCCLater);
                    return confirmCCLater;
                }, function(error) {
                    console.log('Could not get cc token', error);
                    });
    
        }















    }

})();








