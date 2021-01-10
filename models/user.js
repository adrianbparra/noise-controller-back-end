const {model, Schema} = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');


const userSchema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true},
    firstName: {type: String, default: ""},
    lastName: {type: String, required: true},
    title: {type: String, required: true},
    micSensitivity: {type: Number, default: 5},
    theme: {type:String, default: "Farm"},
    selectedClassId: {type:String, default:null},
    createdAt: {type: String, required: true}
});


module.exports = model('User', userSchema)