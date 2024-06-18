// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Navbar from './Component/Navbar';
import Popular from './Component/Popular';
import Top from './Component/Top';
import Upcoming from './Component/Upcoming';
import MovieDetails from './Component/MovieDetails';
import SearchedMovies from './Component/SearchedMovies';
import Home from './Component/Home ';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home/>} />
          <Route path="popular" element={<Popular />} />
          <Route path="top" element={<Top />} />
          <Route path="upcoming" element={<Upcoming />} />
          <Route path="/search" element={<SearchedMovies />} />
          <Route path="movie/:id" element={<MovieDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
