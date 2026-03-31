const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Word = require("../models/word");

router.post("/", async (req, res) => {
    try {
        const { word } = req.body;

        const wordExist = await Word.findOne({ word });
        console.log(wordExist);
        if (wordExist) {
            res.json({ message: "word already exist" });
            return;
        }

        const newWord = new Word({
            word,
        })

        const savedWord = await newWord.save();
        res.status(201).json(savedWord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


router.get("/", async (req, res) => {
    try {

        const { word, k } = req.query;

        const wordInDict = await Word.findOne({ word });

        if (!wordInDict) {

            const suggestions = await Word.find({
                word: {
                    $regex: "^" + word,
                    $options: "i"
                }
            }).limit(k || 0);

            return res.status(404).json({
                message: "Word not found",
                suggestions: suggestions
            });
        }
        wordInDict.frequency += 1;

        await wordInDict.save();

        res.status(200).json(wordInDict);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;


