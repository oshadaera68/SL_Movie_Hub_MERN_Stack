/**
 * Coded By: Era Boy
 * Version: v0.2.0
 **/
import React, { useState } from 'react';
import LoadMovies from '../Duplicate/LoadMovies/LoadMovies';
import { Box, Typography, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function NewMovieReleases() {
    const [darkMode, setDarkMode] = useState(true);
    const navigate = useNavigate();

    return (
        <Box
            minHeight="100vh"
            px={3}
            py={5}
            bgcolor={darkMode ? '#121212' : '#f4f4f4'}
            color={darkMode ? 'white' : 'black'}
        >
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <IconButton onClick={() => navigate(-1)} color="inherit">
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" fontWeight="bold">
                    🎬 New Releases
                </Typography>

                <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                    {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Box>

            {/* Movie List */}
            <LoadMovies darkMode={darkMode} />
        </Box>
    );
}

export default NewMovieReleases;
