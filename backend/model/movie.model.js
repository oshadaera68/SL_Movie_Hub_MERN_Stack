/**
 *Coded By: Era Boy
 *Version: v0.1.0
 **/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    releaseDate: {
        type:Date,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    videoCopy:{
        type: String,
        required: true
    },
    altTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subtitledBy:{
        type: String,
        required: true
    },
    subtitleWebsite: {
        type: String,
        required: true
    },
    downloadLink: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Movie", movieSchema);