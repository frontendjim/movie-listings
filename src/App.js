import React from 'react';

import NavBar from './components/navBar';
import MovieList from './components/movieList';

import './App.css';

const App = () => 
  <div className="App">

    <NavBar />

    <main className="container-fluid">
      <MovieList />
    </main>

  </div>

export default App;