import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import Homepage from "./components/Homepage/Homepage";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import UploadForm from "./components/UploadForm/UploadForm";
import AboutUs from "./components/AboutUs/AboutUs";
import MovieDetail from "./components/MovieDetails/MovieDetails";
import BrowseMovies from "./components/BrowseMovies/BrowseMovies";


export default function App() {
    return (<div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/home" element={<Homepage/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/upload" element={<UploadForm/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/about" element={<AboutUs/>}/>
                <Route path="*" element={<NotFound/>}/>
                <Route path="/movie/:id" element={<MovieDetail darkMode={true}/>}/>
                <Route path="/browse" element={<BrowseMovies/>}/>
            </Routes>
        </Router>

    </div>);
}

