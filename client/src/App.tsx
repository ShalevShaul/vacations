import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './Components/LayoutArea/Layout/Layout';
import AuthContainer from './Components/AuthArea/AuthContainer/AuthContainer';

const App = () => {
    const user = JSON.parse(localStorage.getItem('loginData') || '{}');

    // Checking login time every 15 seconds
    useEffect(() => {
        // Log out if 10 minutes have passed
        const checkExpiry = () => {
            const loginTime = localStorage.getItem('loginTime');
            if (loginTime) {
                const timePassed = Date.now() - Number(loginTime);
                const tenMinutes = 10 * 60 * 1000;
                if (timePassed > tenMinutes) {
                    logout();
                }
            }
        };
        checkExpiry();
        const interval = setInterval(checkExpiry, 15000);
        return () => clearInterval(interval);
    }, []);

    // Log out function 
    function logout() {
        localStorage.removeItem('loginData');
        localStorage.removeItem('loginTime');
        window.location.reload();
    };

    // If user has token go to Layout, else go to AuthContainer
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {user.token ? (
                        <Route path="/*" element={<Layout />} />
                    ) : (
                        <Route path='/*' element={<AuthContainer />} />
                    )}
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;