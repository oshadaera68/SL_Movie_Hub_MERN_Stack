const route = require("express").Router();
const Movie = require("../model/movie.model");

route.post("/new-movie", async (req, res, next) => {
    try {
        const {
            title,
            releaseDate,
            imageURL,
            language,
            videoCopy,
            altTitle,
            description,
            subtitledBy,
            subtitleWebsite,
            downloadLink
        } = req.body;

        // Validate all required fields
        if (
            !title || !releaseDate || !imageURL || !language ||
            !videoCopy || !altTitle || !description ||
            !subtitledBy || !subtitleWebsite || !downloadLink
        ) {
            return res.status(400).json({
                error: "Missing required fields. Please provide title, releaseDate, imageURL, language, videoCopy, altTitle, description, subtitledBy, subtitleWebsite, and downloadLink."
            });
        }

        const newMovie = new Movie({
            title,
            releaseDate,
            imageURL,
            language,
            videoCopy,
            altTitle,
            description,
            subtitledBy,
            subtitleWebsite,
            downloadLink
        });

        const savedMovie = await newMovie.save();
        res.status(201).json({ message: "Movie added", task: savedMovie });
        console.log("Received body:", req.body);
        console.log("Saved movie:", savedMovie);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error. Could not add movie." });
    }
});

module.exports = route;
