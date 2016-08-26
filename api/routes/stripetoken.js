var Users = require('./../models/Users');
var router = require('express').Router(); 

var stripe = require("stripe")(
  "sk_test_PO1R2zpHCLTq64lPsEmzBDr5"
);

    router.post('/' , function (req, res) {
    	var ccDetails = req.body;
    	console.log("hello CC", req.body);
        stripe.tokens.create({
          card: {
            "number": ccDetails.number,
            "exp_month": ccDetails.exp_month,
            "exp_year": ccDetails.exp_year,
            "cvc": ccDetails.cvc
          }
        }).then(function(info){
        		console.log("Getting......gffffffffffffffdgdfdfgdfg" , info)
        		res.json(info);
        }, function(err) {
            res.json(err);
        })

    });

    router.get('/token/:username',function(req,res){
  console.log("in token" + req)
  Users.find({"username": req.params.username})
  .then(function(user){
    console.log("Getting......friends" , user[0].friends)
    res.json({friends : user[0].friends});
  }, function(err) {
    console.log("INININININNIINIININ")
    res.json({error :err});
  })
})


router.post('/check' , function (req, res) {
      var ccDetails = req.body
      console.log("loading token", ccDetails);
      console.log(ccDetails.username) ;
      Users.find({"username": ccDetails.username})
      .then(function(user){
            console.log(user[0].token, "xxxxxxxxxxxxxxxx")

        if(user[0].token === null || user[0].token === undefined) {
          user[0].token = ccDetails.token
          var tokenObj = Users(user[0]); 

          tokenObj.save(function(err, tokenres){
            if(err) {
               console.log("not saved")
            }else {
              res.json(tokenres);
            console.log("success", tokenres);
            }
           });

        }else{
          res.status(400).json({err:err});
          console.log("wasnt added to db")

        }
    
     })
        

    });


module.exports = router;







/*








    Stripe.setPublishableKey('fillMePlease')

    angular.module('app', ['angularPayments'])

    MainController = function($scope){
      $scope.handleStripe = function(status, response){
        if(response.error) {
          // there was an error. Fix it.
        } else {
          // got stripe token, now charge it or smt
          token = response.id
        }
      }
    }


stripe.customers.create(
   { email: 'foobar@example.org' },
   function(err, customer) {
      if (err) {
         console.log("Couldn't create the customer record");
         return;
      }
      console.log("customer id", customer.id);
   }
 );




  stripe.customers.create({
    source: stripeToken,
    description: 'payinguser@example.com'
  }).then(function(customer) {





    return stripe.charges.create({
      amount: 1000, // amount in cents, again
      currency: "cad",
      customer: customer.id
    });
  }).then(function(charge) {
    // YOUR CODE: Save the customer ID and other info in a database for later!
  });

*/










/*router.get('/:username',function(req,res){
	console.log("in user.js" + req)
	Users.find({"username": req.params.username})
	.then(function(user){
		console.log("Getting......" , user)
		res.json({user:user});
	})
})


*/





