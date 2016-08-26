var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
   
	groupId: {
		type: String,
		required: true,
		unique:true
	},


    groupFriends:[{
        username: String,
        owe:[{
            oweName: String,
            oweAmount: Number
        }]
    }],

    Balance: Number,
    Name: String, 
    charges:[{
        amount: Number, 
        description: String, 
        Postedby : String,
        showCharge: Boolean
    }],

	created_at: Date,
  	updated_at: Date
})

userSchema.pre('save', function(next) {
    // Get the current date.
    var currentDate = new Date();

    // Change the updated_at field to current date.
    this.updated_at = currentDate;

    // If created_at doesn't exist, add to that field
    if (!this.created_at) {
        this.created_at = currentDate;
    }

    // Continue.
    next();
});

var Group = mongoose.model('Group', userSchema);
module.exports = Group;






