import React from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import MovieData from "../../data/MovieData";

export default function MovieDetail({ darkMode }) {
    const { id } = useParams();
    const movie = MovieData[parseInt(id)];

    if (!movie) {
        return (
            <div
                className={`text-center py-20 ${
                    darkMode ? "bg-black text-white" : "bg-white text-black"
                }`}
            >
                <h2 className="text-2xl font-semibold">Movie not found</h2>
                <p>Please go back and try again.</p>
            </div>
        );
    }

    return (
        <div
            className={`${
                darkMode ? "bg-zinc-900 text-white" : "bg-white text-black"
            } min-h-screen py-10 px-4 md:px-10`}
        >
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
                        {movie.title} <span className="text-red-500">සිංහල උපසිරැසි සහිතව</span>
                    </h1>

                    <p className="text-sm text-gray-400 mb-2">Language: {movie.language}</p>

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
                                {movie.subtitleWebsite}
                            </a>
                        ) : (
                            <p className="text-gray-400">Not provided</p>
                        )}
                    </div>

                    <Button
                        variant="contained"
                        color="error"
                        href={movie.subtitleDownloadLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            borderRadius: "999px",
                            textTransform: "none",
                            fontSize: "1rem",
                            px: 4,
                        }}
                        disabled={!movie.subtitleDownloadLink}
                    >
                        Download Subtitle
                    </Button>
                </div>
            </div>
        </div>
    );
}
