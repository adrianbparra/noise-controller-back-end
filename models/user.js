const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: String,
    email: {type: String, required: true},
    firstName: String,
    lastName: {type: String, required: true},
    title: {type: String, required: true},
    micSensitivity: {type: Number, default: 5},
    theme: {type:String, default: "Farm"},
});



module.exports = mongoose.model('User', userSchema)