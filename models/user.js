const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: {type: String, required: true, unique: "Email is already taken", lowercase: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: {type: String, required: true},
    title: {type: String, required: true},
    micSensitivity: {type: Number, default: 5},
    theme: {type:String, default: "Farm"},
    selectedClassId: {type:String, default:null}
});

userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' })

module.exports = mongoose.model('User', userSchema)