/**
 * Coded By: Era Boy
 * Version: v0.4.1 (Preview shows all movies, no limit)
 **/
import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function UploadedMovies({ darkMode, previewMode = false }) {
  const [searchTerm, setSearchTerm] = useState("");
  const scrollContainerRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:4000/movie");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error.response?.data || error.message);
      }
    };
    fetchMovies();
  }, []);

  // In preview mode: show all movies (no limit)
  const displayMovies = movies;

  // In full mode: filter by search
  const filteredMovies = previewMode
      ? displayMovies
      : displayMovies.filter((movie) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
      <div
          ref={scrollContainerRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
      >
        {filteredMovies.map((movie, index) => {
          const movieIndex = movies.findIndex((m) => m.title === movie.title);

          // Normalize language
          const langArray = Array.isArray(movie.language) ? movie.language : [movie.language];

          // Normalize video copy
          let videoCopyArray = [];
          if (movie.videoCopy) {
            if (Array.isArray(movie.videoCopy)) {
              videoCopyArray = movie.videoCopy;
            } else if (typeof movie.videoCopy === "string") {
              videoCopyArray = movie.videoCopy.split(/[, ]+/).filter(Boolean);
            }
          }

          const combinedTags = [...langArray, ...videoCopyArray];
          const uniqueTags = [...new Set(combinedTags.filter(Boolean))];

          return (
              <Link
                  key={index}
                  to={`/movie/${movieIndex}`}
                  className="no-underline"
              >
                <div
                    className={`relative rounded-xl overflow-hidden shadow-md transition hover:scale-105 ${
                        darkMode ? "bg-zinc-900" : "bg-white"
                    }`}
                    style={{ width: "180px" }}   // ✅ Fixed card size
                >
                  {/* Poster */}
                  <img
                      src={movie.imageURL}
                      alt={movie.title}
                      className="w-full h-[270px] object-cover"
                  />

                  {/* Tags */}
                  <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-1">
                    {uniqueTags.map((tag, i) => {
                      const lowerTag = tag.toLowerCase();
                      const isInVideoCopy = videoCopyArray.some(vc => vc.toLowerCase() === lowerTag);
                      const isInLanguage = langArray.some(l => l.toLowerCase() === lowerTag);

                      let bgColor = "bg-gray-600";
                      if (isInVideoCopy) bgColor = "bg-red-600";
                      else if (isInLanguage) bgColor = "bg-blue-600";

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

                  {/* Info */}
                  <div className="p-2">
                    <p className="text-sm font-semibold truncate">
                      {movie.title}
                    </p>
                    <p className="text-xs truncate">
                      {movie.language}
                    </p>
                    <p className="text-xs text-gray-400">
                      {movie.releaseDate}
                    </p>
                  </div>
                </div>
              </Link>
          );
        })}
      </div>
  );
}
