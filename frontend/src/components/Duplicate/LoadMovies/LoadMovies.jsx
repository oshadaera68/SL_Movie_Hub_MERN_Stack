import React, {useRef, useState} from "react";
import MovieData from "../../../data/MovieData";
import {Link} from "react-router-dom";
import TextField from "@mui/material/TextField";

function LoadMovies({darkMode}) {
    const [searchTerm, setSearchTerm] = useState("");
    const scrollContainerRef = useRef(null);

    const filteredMovies = MovieData.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const [page, setPage] = useState(1);
    const cardsPerPage = 10;
    const initialCards = 70;

    const movies = MovieData;
    const hasPagination = movies.length > initialCards;
    const visibleMovies = hasPagination ? movies.slice(0, initialCards + (page - 1) * cardsPerPage) : movies;

    const paginated = movies.length > initialCards;
    const totalExtraPages = Math.ceil((movies.length - initialCards) / cardsPerPage);

    const handlePageChange = (p) => {
        setPage(p);
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    return (<>
            <div className="mb-4 max-w-sm">
                <TextField
                    label="Search Movies"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{backgroundColor: darkMode ? "#a09999" : "#fff", borderColor: "red"}}
                />
            </div>

            <div className="relative">

                {/* Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    className="grid grid-cols-10 gap-4"
                >
                    {visibleMovies.map((movie, index) => {
                        const movieIndex = MovieData.findIndex((m) => m.title === movie.title);
                        return (<Link key={index} to={`/movie/${movieIndex}`} className="no-underline">
                                <div
                                    className={`relative rounded-xl overflow-hidden shadow-md min-w-[150px] max-w-[150px] ${darkMode ? "bg-zinc-800" : "bg-gray-200"}`}
                                >
                                    <img
                                        src={movie.image}
                                        alt={movie.title}
                                        className="w-full h-[225px] object-cover"
                                    />
                                    {/* Tags */}
                                    <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-1">
                                        {movie.tags?.map((tag, i) => {
                                            const lowerTag = tag.toLowerCase();
                                            let bgColor = "bg-red-600";
                                            if (["webrip", "bluerip", "dvdrip", "web-dl", "hdrip"].includes(lowerTag)) {
                                                bgColor = "bg-red-600";
                                            } else if (["tamil", "telugu", "malayalam", "kannada", "hindi"].includes(lowerTag)) {
                                                bgColor = "bg-blue-600";
                                            }

                                            return (<span
                                                    key={i}
                                                    className={`${bgColor} text-white text-[10px] font-bold rounded-full px-2 py-[2px] leading-none shadow`}
                                                >
                          {tag}
                        </span>);
                                        })}
                                    </div>

                                    {/* Info */}
                                    <div className="p-2">
                                        <p className="text-sm font-medium truncate text-white">{movie.title}</p>
                                        <p className="text-xs text-gray-400">{movie.date}</p>
                                        <p className="text-[10px] italic text-gray-500">{movie.language}</p>
                                    </div>
                                </div>
                            </Link>);
                    })}

                    {/* Pagination Buttons */}
                    {paginated && (<div className="mt-6 flex justify-center gap-2">
                            {Array.from({length: totalExtraPages}, (_, i) => (<button
                                    key={i + 1}
                                    className={`px-3 py-1 rounded border text-sm ${page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </button>))}
                        </div>)}
                </div>
            </div>
        </>);
}

export default LoadMovies;
