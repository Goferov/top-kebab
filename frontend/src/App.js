import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import RestaurantList from './components/RestaurantList';
import Login from './components/Login';
import Home from "./components/Home";
import Contact from "./components/Contact";
// import RestaurantDetails from './components/RestaurantDetails';

function App() {
  return (
      <Router>
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/contact" element={<Contact />} />
            </Route>
        </Routes>
      </Router>
  );
}

export default App;
