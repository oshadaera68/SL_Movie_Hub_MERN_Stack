/**
 *Coded By: Era Boy
 *Version: v0.1.0
 **/

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const movies = [
  {
    title: "Thunderbolts",
    date: "Apr. 30, 2025",
    image: "https://via.placeholder.com/150x225.png?text=Thunderbolts",
  },
  {
    title: "Words of War",
    date: "May 02, 2025",
    image: "https://via.placeholder.com/150x225.png?text=Words+of+War",
  },
  {
    title: "The Ritual",
    date: "May 27, 2025",
    image: "https://via.placeholder.com/150x225.png?text=The+Ritual",
  },
  {
    title: "Ronth",
    date: "Jun. 13, 2025",
    image: "https://via.placeholder.com/150x225.png?text=Ronth",
  },
  {
    title: "Lilo & Stitch",
    date: "May 17, 2025",
    image: "https://via.placeholder.com/150x225.png?text=Lilo+%26+Stitch",
  },
];

export default function LandingPage() {
  return (
      <div className="bg-black min-h-screen text-white font-sans">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 py-4 bg-zinc-900 shadow-md">
          <h1 className="text-2xl font-bold text-red-500">
            SL <span className="text-white">Movies</span> Hub
          </h1>
          <ul className="flex space-x-6 text-sm">
            <li className="hover:text-red-500 cursor-pointer">About Us</li>
            <li className="hover:text-red-500 cursor-pointer">Upload</li>
            <li className="hover:text-red-500 cursor-pointer">Log In</li>
            <li>
              <Button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded-full">
                Sign Up
              </Button>
            </li>
          </ul>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-20 px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Welcome to <span className="text-red-500">SL Movies Hub</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mb-8">
            Sri Lanka's premium movie portal to discover and stream the latest
            movies and TV shows with Sinhala subtitles.
          </p>
          <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-lg">
            Browse Movies
          </Button>
        </section>

        {/* Movie Carousel Section */}
        <section className="px-6 py-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">New Movie Updates</h3>
            <Button className="text-sm bg-red-600 hover:bg-red-700 text-white rounded-full px-4 py-2 flex items-center">
              See All <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {movies.map((movie, index) => (
                <div
                    key={index}
                    className="bg-zinc-800 rounded-xl overflow-hidden shadow-md min-w-[150px] max-w-[150px]"
                >
                  <img src={movie.image} alt={movie.title} className="w-full h-auto" />
                  <div className="p-2">
                    <p className="text-sm font-medium text-white truncate">
                      {movie.title}
                    </p>
                    <p className="text-xs text-gray-400">{movie.date}</p>
                  </div>
                </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-6 text-gray-400 border-t border-zinc-800">
          &copy; 2025 SL Movies Hub. All rights reserved.
        </footer>
      </div>
  );
}
