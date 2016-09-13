(function(){
    
    angular
        .module('CoupApp')
        .service('groupSrv', GroupService)

    function GroupService($http) {
        var self = this;
        //private variable

        //public functions
        self.checkGroup = checkGroup;
        self.getGroup = getGroup;
        self.postCharge = postCharge;
        self.updateAmount = updateAmount;
        self.transaction = transaction;
        self.clearPayment = clearPayment;
        self.updateNotif = updateNotif;

        console.log("FSDSFD", self.debtName)
        console.log("INSERVICE")

        function updateNotif () {
            return $http.get('/api/group/verify/' + localStorage.username) //request made from intereptor 
            .then(function(user) {
               console.log("GOT NOTIFFFFFFFff", user);
               var pals = []
            for(i = 0; i < user.data.length; i ++) {
               // console.log(user.data.length)

             //   console.log("IIIIIIIIIIIIIIIIIII" , i)
                for(  x = 0; x <  user.data[i].charges.length ; x ++ ) {

               
                  // console.log(user.data[i].charges[x].Postedby)
                    var payTo = user.data[i];
                    //console.log(payTo)

                    if(payTo.Postedby != localStorage.username) {
                        pals.push(payTo);
/*                        return self.debtName;
*/                    }
                }
            }
                return pals;
            }, function(error) {
                console.log('Could not retrieve friends', error);
         });
        }

        function getGroup (members) {
            console.log(members);
           return $http.get('/api/group/confirm/' + members) //request made from intereptor 
            .then(function(user) {
               console.log("GOT GROUP", user); 
                  return user

            }, function(error) {
                console.log('Could not retrieve group', error);
         });
        }










        function checkGroup () {
           return $http.get('/api/group/verify/' + localStorage.username) //request made from intereptor 
            .then(function(user) {
               console.log("GOT USERS", user);

                  return user

            }, function(error) {
                console.log('Could not retrieve friends', error);
         });
        }

        function getGroup (members) {
            console.log(members);
           return $http.get('/api/group/confirm/' + members) //request made from intereptor 
            .then(function(user) {
               console.log("GOT GROUP", user); 
                  return user

            }, function(error) {
                console.log('Could not retrieve group', error);
         });
        }

        function postCharge(info, groupId) {
            console.log(info, "info")
            console.log("IN SERVICE");
            console.log(groupId);

                return $http.put('/api/group/charge/' + groupId, info)
                    .then(function(res){

                 console.log("post Charged" , res); 

                 return res

                 }, function(error) {
                    console.log('Could not retrieve group', error);
                 });      
        }

        function updateAmount(balance, groupId) {
            console.log(balance, "balance")
            console.log("IN update");
            console.log(groupId);



                return $http.put('/api/group/balance/' + groupId, balance)
                    .then(function(res){

                 console.log("amount updated" ); 
               
                 return res


                 }, function(error) {
                    console.log('Could not retrieve group', error);
                 });      

        }

        function transaction(updatecharge) {
            
         


                 $http.put('/api/group/transaction/', updatecharge)
                    .then(function(res){
                        console.log("transaction updated" , res); 
                        
        


                 }, function(error) {
                    console.log('Could not retrieve group', error);
                 });      

        }

        function clearPayment(ids) {
            //console.log(deleteInfo);
            
        
            $http.put('api/group/delete/', ids )
            .then(function(res) {
                console.log("successfully deleted", res);

            }, function (error) {
                console.log("could not delete entry", error)
            })
        }




       


    


    }

})();








