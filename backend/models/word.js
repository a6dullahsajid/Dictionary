const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true
    },
    frequency: {
        type: Number,
        default: 1
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})


const Word = mongoose.model("Word", wordSchema);

module.exports = Word;