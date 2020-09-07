const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: {type: String, required: true, unique: true, uniqueCaseInsensitive: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: {type: String, required: true},
    title: {type: String, required: true},
    micSensitivity: {type: Number, default: 5},
    theme: {type:String, default: "Farm"},
});


userSchema.path('email').validate(async (value) => {
    const emailCount = await mongoose.models.User.countDocuments({email: value });
    return !emailCount;
  }, 'Email already exists');


module.exports = mongoose.model('User', userSchema)