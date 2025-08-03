import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import NotFound from "./components/NotFound/NotFound";
import UploadForm from "./components/UploadForm/UploadForm";
import AboutUs from "./components/AboutUs/AboutUs";
import MovieDetail from "./components/MovieDetails/MovieDetails";
import BrowseMovies from "./components/BrowseMovies/BrowseMovies";
import SubtitleCountdown from "./components/Countdown/SubtitleCountdown";
import UploadedMovies from "./components/SeeAllPage/UploadedMovies";


export default function App() {
    return (<div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/home" element={<Homepage/>}/>
                <Route path="/upload" element={<UploadForm/>}/>
                <Route path="/about" element={<AboutUs/>}/>
                <Route path="*" element={<NotFound/>}/>
                <Route path="/movie/:id" element={<MovieDetail darkMode={true}/>}/>
                <Route path="/browse" element={<BrowseMovies/>}/>
                <Route path="/uploaded" element={<UploadedMovies/>}/>
                <Route path="/countdown" element={<SubtitleCountdown />} />
            </Routes>
        </Router>

    </div>);
}

