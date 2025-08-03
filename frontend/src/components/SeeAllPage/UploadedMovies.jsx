/**
 * Coded By: Era Boy
 * Version: v0.1.0
 **/
import React, { useRef, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "axios";

export default function UploadedMovies({ darkMode }) {
  const [searchTerm, setSearchTerm] = useState("");
  const scrollContainerRef = useRef(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get('http://localhost:4000/movie');
        setMovies(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error.response?.data || error.message);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <>
        <div className="mb-4 max-w-sm">
          <TextField
              label="Search Movies"
              variant="outlined"
              size="small"
              fullWidth
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ backgroundColor: darkMode ? "#a09999" : "#fff" }}
          />
        </div>

        <div className="relative">
          <div
              ref={scrollContainerRef}
              className="grid grid-cols-10 gap-4"
          >
            {filteredMovies.map((movie, index) => {
              const movieIndex = movies.findIndex((m) => m.title === movie.title);

              return (
                  <Link key={index} to={`/movie/${movieIndex}`} className="no-underline">
                    <div className={`relative rounded-xl overflow-hidden shadow-md min-w-[150px] max-w-[150px] ${darkMode ? "bg-zinc-800" : "bg-gray-200"}`}>
                      <img
                          src={movie.image}
                          alt={movie.title}
                          className="w-full h-[225px] object-cover"
                      />

                      {/* Tags */}
                      <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-1">
                        {movie.videoCopy &&
                            Array.isArray(movie.language) &&
                            movie.language.map((tag, i) => {
                              const lowerTag = tag.toLowerCase();
                              let bgColor = "bg-red-600";

                              if (movie.videoCopy.includes(lowerTag)) {
                                bgColor = "bg-red-600";
                              } else if (movie.language.includes(lowerTag)) {
                                bgColor = "bg-blue-600";
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

                      {/* Info */}
                      <div className="p-2">
                        <p className="text-sm font-medium truncate text-white">{movie.title}</p>
                        <p className="text-xs text-gray-400">{movie.date}</p>
                        <p className="text-[10px] italic text-gray-500">
                          {Array.isArray(movie.language) ? movie.language.join(', ') : movie.language}
                        </p>
                      </div>
                    </div>
                  </Link>
              );
            })}
          </div>
        </div>
      </>
  );
}
