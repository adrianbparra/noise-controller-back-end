const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const scoreSchema = new Schema({
    date: {type: String, required: true},
    theme: {type: String, default: "Farm"},
    score: {type: Number, required: true},
    streak: {type:Number, default: 0},
    classId: {type: String, required: true},
});



module.exports = mongoose.model('Score', scoreSchema)


// https://youtu.be/ed8SzALpx1Q?t=7847