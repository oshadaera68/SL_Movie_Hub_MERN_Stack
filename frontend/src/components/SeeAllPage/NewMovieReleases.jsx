/**
 * Coded By: Era Boy
 * Version: v0.2.1
 **/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadMovies from "../Duplicate/LoadMovies/LoadMovies";

function NewMovieReleases() {
    const [darkMode, setDarkMode] = useState(true);
    const navigate = useNavigate();

    return (
        <div className={`${darkMode ? 'bg-[#0d0d0d] text-white' : 'bg-gray-100 text-black'} min-h-screen font-poppins px-4 md:px-16 py-8`}>

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <button onClick={() => navigate(-1)} className="text-inherit hover:text-red-500">
                    <ArrowBackIcon />
                </button>
                <h1 className="text-3xl font-bold">🎬 New Releases</h1>
                <button onClick={() => setDarkMode(!darkMode)} className="text-inherit hover:text-yellow-500">
                    {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </button>
            </div>

            {/* Recently Added Tag */}
            <div className="mb-4">
        <span className="bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold shadow-md">
          Recently added
        </span>
            </div>

            {/* Load Movies */}
            <LoadMovies darkMode={darkMode} />
        </div>
    );
}

export default NewMovieReleases;
