const {model, Schema} = require('mongoose');


const classSchema = new Schema({
    name: {type: String, required: true},
    theme: {type:String, default: "Farm"},
    grade: {type: String, required: true},
    numberOfKids: {type: Number, required: true},
    // streak: {type: Number, default: 0},
    teacherId: {type: String, required: true},
    scores: [
        {
            createdAt: {type: String, required: true},
            theme: {type: String, default: "Farm"},
            score: {type: Number, required: true},
        }
    ],
    // teacher: {
    //     type: Schema.Types.ObjectId,
    //     ref: "users"
    // }
});


module.exports = model('Class', classSchema)