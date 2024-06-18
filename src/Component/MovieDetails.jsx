// src/Component/MovieDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./CSS/Navbar.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
const BASE_URL = 'https://api.themoviedb.org/3/movie';

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);

    useEffect(() => {
        fetchMovieDetails(id);
        fetchMovieCredits(id);
    }, [id]);

    const fetchMovieDetails = async (movieId) => {
        try {
            const response = await axios.get(`${BASE_URL}/${movieId}?api_key=${API_KEY}&language=en-US`);
            setMovie(response.data);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    const fetchMovieCredits = async (movieId) => {
        try {
            const response = await axios.get(`${BASE_URL}/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
            setCredits(response.data);
        } catch (error) {
            console.error("Error fetching movie credits:", error);
        }
    };

    if (!movie || !credits) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container my-4">
            <div className="row bg-dark text-white rounded-2 p-4">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="d-flex my-5">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            className="img-fluid me-3"
                            alt={movie.title}
                            style={{ width: '100px', borderRadius: '8px' }}
                        />
                        <div>
                            <h2>{movie.title}</h2>
                            <ul className="list-unstyled">
                                <li><strong>Release Date:</strong> {movie.release_date}</li>
                                <li><strong>Runtime:</strong> {movie.runtime} minutes</li>
                                <li><strong>Rating:</strong> {movie.vote_average}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h4><strong>Overview</strong></h4>
                        <p>{movie.overview}</p>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 d-flex align-items-center justify-content-center">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        className="img-fluid rounded-2 "
                        alt={movie.title}
                        style={{ opacity: '0.8', height: '95%', width: '55%', objectFit: 'cover' }}
                    />
                </div>
            </div>
            <div className="my-5">
    <h3 className="text-white">Cast</h3>
    <div className="row justify-content-center">
        {credits.cast.map((castMember) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={castMember.cast_id}>
                <div className="card h-100 border-0 bg-dark">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${castMember.profile_path}`}
                        className="card-img-top"
                        alt={castMember.name}
                    />
                    <div className="card-body text-white">
                        <h5 className="card-title">{castMember.name}</h5>
                        <p className="card-text">as {castMember.character}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>

        </div>
    );
}
