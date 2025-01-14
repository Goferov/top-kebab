import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './components/Login';
import Home from "./components/Home";
import Contact from "./components/Contact";
import { ModalProvider } from './services/modal';
import RestaurantList from './components/RestaurantList';
import RestaurantDetails from './components/RestaurantDetails'

function App() {
  return (
      <ModalProvider>
          <Router>
              <Routes>
                  <Route element={<MainLayout />}>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/restaurant" element={<RestaurantList />} />
                      <Route path="/restaurant/:id" element={<RestaurantDetails />} />
                      <Route path="/contact" element={<Contact />} />
                  </Route>
              </Routes>
          </Router>
      </ModalProvider>
  );
}

export default App;
