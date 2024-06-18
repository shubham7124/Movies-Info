import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
const API_URL = 'https://api.themoviedb.org/3/movie/top_rated';

const Top = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchTopRatedMovies = async () => {
            try {
                const response = await axios.get(`${API_URL}?api_key=${API_KEY}&language=en-US&page=${page}`);
                setMovies(response.data.results);
                setTotalPages(response.data.total_pages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching top-rated movies:', error);
                setLoading(false);
            }
        };

        fetchTopRatedMovies();
    }, [page]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div>
            <h2 className='text-white'>Top Rated Movies</h2>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="row">
                        {movies.map((movie) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={movie.id}>
                                <div className="card border-0 rounded-0 text-white bg-dark custom-shadow-white ">
                                    <Link to={`/movie/${movie.id}`}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            className="card-img-top"
                                            alt={movie.title}
                                        />
                                    </Link>
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.title}</h5>
                                        <p className="card-text">Rating: {movie.vote_average}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-between m-4">
                        <button
                            className="btn btn-primary"
                            disabled={page === 1}
                            onClick={() => handlePageChange(page - 1)}
                        >
                            Previous
                        </button>
                        <h5 className='text-white'> {page}/ {totalPages}</h5>
                        <button
                            className="btn btn-primary"
                            disabled={page === totalPages}
                            onClick={() => handlePageChange(page + 1)}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Top;
