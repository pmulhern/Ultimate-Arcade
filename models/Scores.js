const mongoose = require('mongoose');

const ScoresSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 15
    },
    scores:{
        type: Number,
        required: true,
    },
});


module.exports = mongoose.model('Scores',ScoreSchema);