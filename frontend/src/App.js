import React, {useEffect} from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Panel from "./pages/Panel";
import { ModalProvider } from './services/modal';
import { UserProvider} from './contexts/UserContext';
import RestaurantList from './pages/RestaurantList';
import RestaurantDetails from './pages/RestaurantDetails';
import AdminRestaurantList from "./pages/AdminRestaurantList";
import AddRestaurant from "./pages/AddRestaurant";
import Error404 from "./pages/Error404";

function App() {

    useEffect(() => {
        document.title = "Top Kebab";
    }, []);
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
