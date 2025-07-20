import React, { useState } from "react";
import MovieData from "../../../data/MovieData";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";

function LoadMovies({ darkMode }) {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredMovies = MovieData.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {/* Search Box */}
            <div className="mb-4 max-w-sm">
                <TextField
                    label="Search Movies"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{
                        input: { color: darkMode ? "white" : "black" },
                        label: { color: darkMode ? "white" : "black" },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: darkMode ? "white" : "black",
                            },
                            "&:hover fieldset": {
                                borderColor: darkMode ? "red" : "gray",
                            },
                        },
                    }}
                />
            </div>

            {/* Movie Cards Grid with 10 columns */}
            <div
                className={`grid grid-cols-10 gap-4 pb-4 ${
                    darkMode ? "bg-zinc-900" : "bg-gray-50"
                }`}
            >
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie, index) => {
                        const movieIndex = MovieData.findIndex((m) => m.title === movie.title);

                        return (
                            <Link key={index} to={`/movie/${movieIndex}`} className="no-underline">
                                <div
                                    className={`relative rounded-xl overflow-hidden shadow-md min-w-[150px] max-w-[150px] ${
                                        darkMode ? "bg-zinc-800" : "bg-gray-200"
                                    }`}
                                >
                                    {/* Poster */}
                                    <img
                                        src={movie.image}
                                        alt={movie.title}
                                        className="w-full h-[225px] object-cover"
                                    />

                                    {/* Top-left Tag Badges */}
                                    <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-1">
                                        {movie.tags?.map((tag, i) => {
                                            const lowerTag = tag.toLowerCase();
                                            let bgColor = "bg-red-600";

                                            // Set colors based on tag type
                                            if (
                                                [
                                                    "webrip",
                                                    "bluerip",
                                                    "dvdrip",
                                                    "web-dl",
                                                    "hdrip",
                                                ].includes(lowerTag)
                                            ) {
                                                bgColor = "bg-red-600"; // Copy types
                                            } else if (
                                                ["tamil", "telugu", "malayalam", "kannada", "hindi"].includes(
                                                    lowerTag
                                                )
                                            ) {
                                                bgColor = "bg-blue-600"; // Languages
                                            }

                                            return (
                                                <span
                                                    key={i}
                                                    className={`${bgColor} text-white text-[10px] font-bold rounded-full px-2 py-[2px] leading-none shadow`}
                                                >
                          {tag}
                        </span>
                                            );
                                        })}
                                    </div>

                                    {/* Info Section */}
                                    <div className="p-2">
                                        <p className="text-sm font-medium truncate text-white">{movie.title}</p>
                                        <p className="text-xs text-gray-400">{movie.date}</p>
                                        <p className="text-[10px] italic text-gray-500">{movie.language}</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <p className="text-gray-400 col-span-10">No movies found.</p>
                )}
            </div>
        </>
    );
}

export default LoadMovies;
