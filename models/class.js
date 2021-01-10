const {model, Schema} = require('mongoose');


const classSchema = new Schema({
    name: {type: String, required: true},
    theme: {type:String, default: "Farm"},
    grade: {type: String, required: true},
    numberOfKids: {type: Number, required: true},
    teacherId: {type: String, required: true},
    scores: [
        {
            createdAt: {type: String, required: true},
            theme: {type: String, default: "Farm"},
            score: {type: Number, required: true},
        }
    ],
    highestScore: {type: Number, default: 0}
});


module.exports = model('Class', classSchema)