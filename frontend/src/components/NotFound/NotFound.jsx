/**
 *Coded By: Era Boy
 *Version: v0.1.0
 **/

import background from '../../assets/wallpaper.jpeg'
import image from '../../assets/404.png'
import {Link} from 'react-router-dom';

export default function NotFound() {
    return (<div className="flex items-center justify center min-h-screen bg-cover bg-no-repeat bg-white opacity-65"
                 style={{backgroundImage: `url(${background})`}}>
        <div className="absolute items-center justify-center left-70 top-52 right-70">
            <img src={image} alt="not found" className="w-100 h-100"/>
        </div>

        <div className="absolute items-center justify-center"
             style={{fontFamily: "Edu NSW ACT Hand Pre", left: "50rem", top: "20rem"}}>
            <h1 className="font-bold text-6xl" style={{color: "#ffffff"}}>Page not found !</h1>
            <br/>
            <h4 className="absolute font-bold text-2xl items-center justify-center" style={{color: "#ffffff"}}>The page
                you're
                looking for the doesn't exists. If you want to go to the home page <Link to='/home'
                                                                                         style={{color: "blue"}}>Click</Link> this.
            </h4>
            <br/>
            <h3 className="absolute font-bold text-2xl items-center justify-center"
                style={{color: "#ffffff", top: "12rem"}}>&copy; SL
                Movies Hub</h3>
        </div>

    </div>)
}