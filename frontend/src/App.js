import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import Login from './components/Login';
// import RestaurantDetails from './components/RestaurantDetails';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<RestaurantList />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
  );
}

export default App;
