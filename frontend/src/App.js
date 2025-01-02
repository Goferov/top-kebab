import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
// import RestaurantDetails from './components/RestaurantDetails';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<RestaurantList />} />
        </Routes>
      </Router>
  );
}

export default App;
