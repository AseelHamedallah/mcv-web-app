import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListingPage from './pages/ListingPage';
import DetailsPage from './pages/DetailsPage';
import './App.css';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><ListingPage /></MainLayout>} />
      <Route path="/details/:id" element={<MainLayout><DetailsPage /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
