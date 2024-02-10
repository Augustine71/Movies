import React from "react"
import "./Header.css"
import { Link } from "react-router-dom"

import LogIn from "../Login/LogIn"

const Header = () => {
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/"><img className="header__icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" /></Link>
                <Link to="/movies/movie" style={{textDecoration: "none"}}><span>Movies</span></Link>
                <Link to="/movies/tv" style={{textDecoration: "none"}}><span>Tv Shows</span></Link>
            </div>
            <div className="headerRight">
                <LogIn />
            </div>
        </div>
    )
}

export default Header