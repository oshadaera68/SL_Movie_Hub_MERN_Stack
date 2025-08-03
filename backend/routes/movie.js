const route = require("express").Router();
const Movie = require("../model/movie.model");

route.get('/', async (req, res, next) => {
    try {
        const tasks = await Movie.find(); // No filter
        res.json(tasks);
    } catch (err) {
        next(err);
    }
});

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

        // Validate fields
        const missingFields = [];

        if (!title) missingFields.push("title");
        if (!releaseDate) {
            missingFields.push("releaseDate");
        } else if (isNaN(new Date(releaseDate).getTime())) {
            return res.status(400).json({ error: "releaseDate must be a valid date." });
        }

        if (!imageURL) missingFields.push("imageURL");
        if (!language) missingFields.push("language");
        if (!videoCopy) missingFields.push("videoCopy");
        if (!altTitle) missingFields.push("altTitle");
        if (!description) missingFields.push("description");
        if (!subtitledBy) missingFields.push("subtitledBy");
        if (!subtitleWebsite) missingFields.push("subtitleWebsite");
        if (!downloadLink) missingFields.push("downloadLink");

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: `Missing required fields: ${missingFields.join(", ")}`
            });
        }

        // Save movie
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

        // Logging
        console.log("Received body:", req.body);
        console.log("Saved movie:", savedMovie);

    } catch (err) {
        console.error("Error saving movie:", err);
        res.status(500).json({ error: "Server error. Could not add movie." });
    }
});


module.exports = route;
