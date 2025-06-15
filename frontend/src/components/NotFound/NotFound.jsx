/**
 * Coded By: Era Boy
 * Version: v0.1.0
 **/

import background from '../../assets/wallpaper.jpeg';
import image from '../../assets/404.png';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-cover bg-no-repeat bg-white relative"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="bg-black bg-opacity-60 w-full h-full absolute top-0 left-0 z-0"></div>

            <div className="z-10 p-4 flex flex-col items-center text-center">
                <img
                    src={image}
                    alt="not found"
                    className="w-60 sm:w-80 md:w-96 lg:w-[30rem] mb-6"
                />
                <h1
                    className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4"
                    style={{ fontFamily: "Edu NSW ACT Hand Pre" }}
                >
                    Page not found!
                </h1>

                <p className="text-white text-lg sm:text-xl md:text-2xl max-w-xl mb-6">
                    The page you're looking for doesn't exist. If you want to go to the home page,{' '}
                    <Link to="/home" className="text-blue-400 underline hover:text-blue-300">
                        click here
                    </Link>.
                </p>

                <h3 className="text-white text-base sm:text-lg md:text-xl">
                    &copy; SL Movies Hub
                </h3>
            </div>
        </div>
    );
}
