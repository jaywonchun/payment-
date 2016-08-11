var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,
	email: {
		type: String,
		required: true,
		unique:true
	},
	password: String,
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

var Users = mongoose.model('Users', userSchema);
module.exports = Users;
