import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom';
import axios from 'axios';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
const BASE_URL = 'https://api.themoviedb.org/3/movie/popular';

export default function Home() {

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const fetchMovies = async (page) => {
    try {
      const response = await axios.get(`${BASE_URL}?api_key=${API_KEY}&language=en-US&page=${page}`);
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4 text-white"> Movies</h2>
      <div className="row ">
        {movies.map((movie) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={movie.id}>
            <div className="card h-100 bg-black text-white custom-shadow-white ">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">  <Link to={`/movie/${movie.id}`}className='text-decoration-none text-white'>{movie.title}</Link></h5>
                <p className="card-text">{movie.overview.substring(0, 100)}...</p>
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
        <h5 className='text-white'> {page}/{totalPages}</h5>
        <button
          className="btn btn-primary"
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}
