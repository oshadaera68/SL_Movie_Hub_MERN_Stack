/**
 * Coded By: Era Boy
 * Version: v0.2.0
 **/
import React, { useState } from 'react';
import MovieData from '../../../data/MovieData';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';

function LoadMovies({ darkMode = true }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMovies = MovieData.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box>
            {/* Search Input */}
            <Box mb={3} maxWidth={400}>
                <TextField
                    label="Search Movies"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{
                        input: { color: darkMode ? 'white' : 'black' },
                        label: { color: darkMode ? 'white' : 'black' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: darkMode ? 'white' : 'black',
                            },
                            '&:hover fieldset': {
                                borderColor: darkMode ? 'red' : 'gray',
                            },
                        },
                    }}
                />
            </Box>

            {/* Movie Cards */}
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                {filteredMovies.length > 0 ? (filteredMovies.map((movie, index) => {
                    const movieIndex = MovieData.findIndex((m) => m.title === movie.title); // Get real index from original array
                    return (<Link key={index} to={`/movie/${movieIndex}`} className="no-underline">
                        <div
                            className={`${darkMode ? "bg-zinc-800" : "bg-gray-200"} rounded-xl overflow-hidden shadow-md min-w-[150px] max-w-[150px]`}
                        >
                            <img
                                src={movie.image}
                                alt={movie.title}
                                className="w-full h-[225px] object-cover"
                            />
                            <div className="p-2">
                                <p className="text-sm font-medium truncate">{movie.title}</p>
                                <p className="text-xs text-gray-500">{movie.date}</p>
                                <p className="text-[10px] text-gray-400 italic">{movie.language}</p>
                            </div>
                        </div>
                    </Link>);
                })) : (<p>No movies found.</p>)}
            </div>
        </Box>
    );
}

export default LoadMovies;
