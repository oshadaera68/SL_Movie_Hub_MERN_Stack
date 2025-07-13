import React, {useState} from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {ChevronRight} from "lucide-react";
import {Link} from "react-router-dom";
import LoadMovies from "../Duplicate/LoadMovies/LoadMovies";

export default function LandingPage() {
    const [darkMode, setDarkMode] = useState(true);
    const [anchorElGenres, setAnchorElGenres] = useState(null);
    const [anchorElLangs, setAnchorElLangs] = useState(null);

    const openGenres = Boolean(anchorElGenres);
    const openLangs = Boolean(anchorElLangs);

    const handleOpenGenres = (e) => setAnchorElGenres(e.currentTarget);
    const handleCloseGenres = () => setAnchorElGenres(null);

    const handleOpenLangs = (e) => setAnchorElLangs(e.currentTarget);
    const handleCloseLangs = () => setAnchorElLangs(null);

    return (<div
            className={`min-h-screen flex flex-col justify-between ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
            {/* Navbar */}
            <nav
                className={`flex items-center justify-between px-6 py-4 ${darkMode ? "bg-zinc-900" : "bg-gray-100"} shadow-md`}>
                <h1 className={`text-2xl font-bold ${darkMode ? "text-red-500" : "text-red-600"}`}>
                    SL <span className={darkMode ? "text-white" : "text-black"}>Movies</span> Hub
                </h1>
                <ul className="flex space-x-6 text-sm items-center">
                    <li>
                        <Button
                            color="inherit"
                            size="small"
                            onClick={handleOpenGenres}
                            sx={{textTransform: "none"}}
                        >
                            Genres
                        </Button>
                        <Menu anchorEl={anchorElGenres} open={openGenres} onClose={handleCloseGenres}>
                            <MenuItem onClick={handleCloseGenres}>Action</MenuItem>
                            <MenuItem onClick={handleCloseGenres}>Thriller</MenuItem>
                            <MenuItem onClick={handleCloseGenres}>Horror</MenuItem>
                        </Menu>
                    </li>
                    <li>
                        <Button
                            color="inherit"
                            size="small"
                            onClick={handleOpenLangs}
                            sx={{textTransform: "none"}}
                        >
                            Languages
                        </Button>
                        <Menu anchorEl={anchorElLangs} open={openLangs} onClose={handleCloseLangs}>
                            <MenuItem onClick={handleCloseLangs}>Malayalam</MenuItem>
                            <MenuItem onClick={handleCloseLangs}>Telugu</MenuItem>
                        </Menu>
                    </li>
                    <Link to="/about"><li className="cursor-pointer hover:underline">About Us</li></Link>
                    <Link to="/upload"><li className="cursor-pointer hover:underline">Upload</li></Link>
                    <Link to="/login">
                        <li className="cursor-pointer hover:underline">Log In</li>
                    </Link>
                    <li>
                        <Link to="/register">
                            <Button
                                variant="contained"
                                color="error"
                                size="small"
                                sx={{
                                    borderRadius: "999px", textTransform: "none", fontSize: "0.875rem",
                                }}
                            >
                                Sign Up
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                            {darkMode ? <Brightness7Icon/> : <Brightness4Icon/>}
                        </IconButton>
                    </li>
                </ul>
            </nav>

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="flex flex-col items-center justify-center text-center py-20 px-4">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                        Welcome to <span className="text-red-500">SL Movies Hub</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mb-8">
                        Sri Lanka's premium movie portal to discover and stream the latest movies and TV shows with
                        Sinhala subtitles.
                    </p>
                    <Link to="/browse">
                        <Button
                            variant="contained"
                            color="error"
                            size="large"
                            sx={{
                                borderRadius: "999px", textTransform: "none", fontSize: "1rem", px: 4,
                            }}
                        >
                            Browse Movies
                        </Button>
                    </Link>
                </section>

                {/* Movie Section */}
                <section className="px-6 py-10">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold">New Releases</h3>
                        <Link to='/seeallreleases'><Button
                            variant="contained"
                            color="error"
                            size="small"
                            sx={{
                                borderRadius: "999px", textTransform: "none", fontSize: "0.875rem",
                            }}
                            endIcon={<ChevronRight className="w-4 h-4"/>}
                        >
                            See All
                        </Button></Link>
                    </div>

                    {/*add the loaded movies*/}
                    <LoadMovies/>

                    <br/><br/> <br/>

                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold">Uploaded Movies</h3>
                        <Link><Button
                            variant="contained"
                            color="error"
                            size="small"
                            sx={{
                                borderRadius: "999px", textTransform: "none", fontSize: "0.875rem",
                            }}
                            endIcon={<ChevronRight className="w-4 h-4"/>}
                        >
                            See All
                        </Button></Link>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="text-center py-6 border-t border-zinc-800 text-gray-400">
                &copy; 2025 SL Movies Hub. All rights reserved.
            </footer>
        </div>);
}
