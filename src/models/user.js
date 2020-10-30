/*---------------------------- importing packages ----------------------------*/
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
/*---------------------------- creating schema ----------------------------*/
const userSchema = mongoose.Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	age: { type: Number },
	gender: { type: String },
	recipes: [{ type: mongoose.Types.ObjectId, ref: 'Recipe' }]
});
/*---------------------------- creating the model in the DB ----------------------------*/
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);
module.exports = User;
