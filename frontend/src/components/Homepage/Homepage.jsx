import React, { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import TextField from "@mui/material/TextField";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import MovieData from "../../data/MovieData";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [anchorElGenres, setAnchorElGenres] = useState(null);
  const [anchorElLangs, setAnchorElLangs] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const openGenres = Boolean(anchorElGenres);
  const openLangs = Boolean(anchorElLangs);

  const handleOpenGenres = (e) => setAnchorElGenres(e.currentTarget);
  const handleCloseGenres = () => setAnchorElGenres(null);

  const handleOpenLangs = (e) => setAnchorElLangs(e.currentTarget);
  const handleCloseLangs = () => setAnchorElLangs(null);

  const filteredMovies = MovieData.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className={`min-h-screen flex flex-col justify-between ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
        {/* Navbar */}
        <nav className={`flex items-center justify-between px-6 py-4 ${darkMode ? "bg-zinc-900" : "bg-gray-100"} shadow-md`}>
          <h1 className={`text-2xl font-bold ${darkMode ? "text-red-500" : "text-red-600"}`}>
            SL <span className={darkMode ? "text-white" : "text-black"}>Movies</span> Hub
          </h1>
          <ul className="flex space-x-6 text-sm items-center">
            <li>
              <Button
                  color="inherit"
                  size="small"
                  onClick={handleOpenGenres}
                  sx={{ textTransform: "none" }}
              >
                Genres
              </Button>
              <Menu anchorEl={anchorElGenres} open={openGenres} onClose={handleCloseGenres}>
                <MenuItem onClick={handleCloseGenres}>Action</MenuItem>
                <MenuItem onClick={handleCloseGenres}>Romance</MenuItem>
                <MenuItem onClick={handleCloseGenres}>Thriller</MenuItem>
                <MenuItem onClick={handleCloseGenres}>Horror</MenuItem>
              </Menu>
            </li>
            <li>
              <Button
                  color="inherit"
                  size="small"
                  onClick={handleOpenLangs}
                  sx={{ textTransform: "none" }}
              >
                Languages
              </Button>
              <Menu anchorEl={anchorElLangs} open={openLangs} onClose={handleCloseLangs}>
                <MenuItem onClick={handleCloseLangs}>English</MenuItem>
                <MenuItem onClick={handleCloseLangs}>Tamil</MenuItem>
                <MenuItem onClick={handleCloseLangs}>Malayalam</MenuItem>
                <MenuItem onClick={handleCloseLangs}>Telugu</MenuItem>
              </Menu>
            </li>
            <li className="cursor-pointer hover:underline">About Us</li>
            <li className="cursor-pointer hover:underline">Upload</li>
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
                      borderRadius: "999px",
                      textTransform: "none",
                      fontSize: "0.875rem",
                    }}
                >
                  Sign Up
                </Button>
              </Link>
            </li>
            <li>
              <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
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
              Sri Lanka's premium movie portal to discover and stream the latest movies and TV shows with Sinhala subtitles.
            </p>
            <Button
                variant="contained"
                color="error"
                size="large"
                sx={{
                  borderRadius: "999px",
                  textTransform: "none",
                  fontSize: "1rem",
                  px: 4,
                }}
            >
              Browse Movies
            </Button>
          </section>

          {/* Movie Section */}
          <section className="px-6 py-10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">New Movie Updates</h3>
              <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{
                    borderRadius: "999px",
                    textTransform: "none",
                    fontSize: "0.875rem",
                  }}
                  endIcon={<ChevronRight className="w-4 h-4" />}
              >
                See All
              </Button>
            </div>

            {/* Search bar */}
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

            <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
              {filteredMovies.length > 0 ? (
                  filteredMovies.map((movie, index) => {
                    const movieIndex = MovieData.findIndex((m) => m.title === movie.title); // Get real index from original array
                    return (
                        <Link key={index} to={`/movie/${movieIndex}`} className="no-underline">
                          <div
                              className={`${
                                  darkMode ? "bg-zinc-800" : "bg-gray-200"
                              } rounded-xl overflow-hidden shadow-md min-w-[150px] max-w-[150px]`}
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
                        </Link>
                    );
                  })
              ) : (
                  <p>No movies found.</p>
              )}
            </div>

            <br/><br /> <br/>

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Uploaded Movies</h3>
              <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{
                    borderRadius: "999px",
                    textTransform: "none",
                    fontSize: "0.875rem",
                  }}
                  endIcon={<ChevronRight className="w-4 h-4" />}
              >
                See All
              </Button>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="text-center py-6 border-t border-zinc-800 text-gray-400">
          &copy; 2025 SL Movies Hub. All rights reserved.
        </footer>
      </div>
  );
}
