import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MovieData from "../../data/MovieData";

export default function MovieDetail({ darkMode: defaultDarkMode = true }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const movie = MovieData[parseInt(id)];
    const [darkMode, setDarkMode] = useState(defaultDarkMode);

    if (!movie) {
        return (
            <div
                className={`text-center py-20 ${
                    darkMode ? "bg-black text-white" : "bg-white text-black"
                }`}
            >
                <h2 className="text-2xl font-semibold">Movie not found</h2>
                <p>Please go back and try again.</p>
                <Button
                    variant="outlined"
                    onClick={() => navigate(-1)}
                    sx={{ mt: 4, borderRadius: "999px" }}
                >
                    Go Back
                </Button>
            </div>
        );
    }

    return (
        <div
            className={`${
                darkMode ? "bg-zinc-900 text-white" : "bg-white text-black"
            } min-h-screen py-10 px-4 md:px-10`}
        >
            {/* Top Controls */}
            <div className="flex justify-between items-center mb-6">
                <IconButton onClick={() => navigate(-1)} color="inherit">
                    <ArrowBackIcon />
                </IconButton>

                <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                    {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </div>

            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start">
                {/* Poster */}
                <div className="w-full md:w-1/3">
                    <img
                        src={movie.image}
                        alt={movie.title}
                        className="rounded-xl shadow-lg w-full object-cover"
                    />
                </div>

                {/* Info */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">
                        {movie.title} :{" "}
                        <span className="text-red-500">සිංහල උපසිරැසි සහිතව</span>
                    </h1>
                    <p className="text-sm text-gray-500 mb-2">Video Copy: {movie.videoCopy}</p>

                    <p className="text-sm text-gray-500 mb-2">Language: {movie.language || "Unknown"}</p>

                    {movie.altTitle && (
                        <h2 className="text-lg italic mb-4 text-gray-300">{movie.altTitle}</h2>
                    )}

                    <p className="leading-relaxed mb-6 text-justify">
                        {movie.description || "No description available for this movie."}
                    </p>

                    <div className="mb-4">
                        <p className="font-semibold">Subtitle By:</p>
                        <p className="text-sm text-gray-300">{movie.subtitleBy || "Unknown"}</p>
                    </div>

                    <div className="mb-6">
                        <p className="font-semibold">Subtitle Website:</p>
                        {movie.subtitleWebsite ? (
                            <a
                                href={movie.subtitleWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-500 hover:underline break-all"
                            >
                                {movie.subtitleWebsite || "Unknown"}
                            </a>
                        ) : (
                            <p className="text-gray-400">Not provided</p>
                        )}
                    </div>

                    <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                            navigate(`/countdown?link=${encodeURIComponent(movie.subtitleDownloadLink)}`)
                        }
                        sx={{
                            borderRadius: "999px",
                            textTransform: "none",
                            fontSize: "1rem",
                            px: 4,
                        }}
                    >
                        Download Subtitle
                    </Button>

                </div>
            </div>
        </div>
    );
}
