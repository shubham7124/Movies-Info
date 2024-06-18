import React, { useState } from 'react'
import "./CSS/Navbar.css"
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom"
import SearchedMovies from './SearchedMovies';


const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
const BASE_URL = 'https://api.themoviedb.org/3/movie/popular';

export default function Navbar() {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery) {
            navigate(`/search?query=${searchQuery}`);
        }
    };


    const handleToggle = () => {
        setIsCollapsed(!isCollapsed);
    };

    const closeNavbar = () => {
        setIsCollapsed(true);
    };

    return (

        <>
            <nav className="navbar navbar-expand-lg navbar-custom  my-3 m-2 rounded-2">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" onClick={closeNavbar}>MoviesDB</Link>
                    <button className="navbar-toggler" type="button" onClick={handleToggle} aria-controls="navbarSupportedContent" aria-expanded={!isCollapsed} aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse justify-content-end ${isCollapsed ? '' : 'show'}`} id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/popular" onClick={closeNavbar}>Popular Movies</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/top" onClick={closeNavbar}>Top Movies</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/upcoming" onClick={closeNavbar}>Upcoming Movies</Link>
                            </li>
                            <li className="nav-item">
                                <form className="d-flex" role="search" onSubmit={handleSearch}>
                                    <input
                                        className="form-control me-2"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container ">
              

                <Outlet />
            </div>

        </>


    );
}
