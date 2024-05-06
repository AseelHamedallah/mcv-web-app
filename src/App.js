import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListingPage from './pages/ListingPage';
import DetailsPage from './pages/DetailsPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListingPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />

      </Routes>
    </Router>
  );
}

export default App;
