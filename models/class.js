const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const classSchema = new Schema({
    name: {type: String, required: true},
    theme: {type:String, default: "Farm"},
    grade: {type: String, required: true},
    numberOfKids: {type: Number, required: true},
    streak: {type: Number, default: 0},
    teacherId: {type: String, required: true},
});


module.exports = mongoose.model('Class', classSchema)