import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from "./components/Home";
import Contact from "./components/Contact";
import Panel from "./components/Panel";
import { ModalProvider } from './services/modal';
import { UserProvider} from './contexts/UserContext';
import RestaurantList from './components/RestaurantList';
import RestaurantDetails from './components/RestaurantDetails';
import AdminRestaurantList from "./components/AdminRestaurantList";
import AddRestaurant from "./components/AddRestaurant";
import Error404 from "./components/Error404";

function App() {


    return (
        <UserProvider>
            <ModalProvider>
                <Router>
                    <Routes>
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/restaurant" element={<RestaurantList />} />
                            <Route path="/restaurant/:id" element={<RestaurantDetails />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/panel" element={<ProtectedRoute><Panel /></ProtectedRoute>} />
                            <Route path="/restaurantList" element={<ProtectedRoute adminOnly><AdminRestaurantList /></ProtectedRoute>} />
                            <Route path="/addRestaurant" element={<ProtectedRoute adminOnly><AddRestaurant /></ProtectedRoute>} />
                            <Route path="/addRestaurant/:id" element={<ProtectedRoute adminOnly><AddRestaurant /></ProtectedRoute>} />
                            <Route path="*" element={<Error404 />} />
                        </Route>
                    </Routes>
                </Router>
            </ModalProvider>
        </UserProvider>
    );
}

export default App;
