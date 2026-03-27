import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Login from './components/user/Login';
import Dashboard from './components/dashboard/Dashboard';
import Footer from './layout/FooterBar';
import Navbar from './layout/NavigationBar';
import { useSnackbar } from './layout/useSnackBar';
import SnackbarComponent from './layout/snackBarComponent';
import './app.css'; 

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && localStorage.getItem('token')) {
      try {
        return JSON.parse(storedUser);
      } catch (err) {
        console.error('Error parsing stored user:', err);
        return null;
      }
    }
    return null;
  });

  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  // Sync user state when token changes
  useEffect(() => {
    const syncUserFromToken = () => {
      if (token) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (err) {
            console.error('Error parsing stored user:', err);
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    syncUserFromToken();
  }, [token]);

  const handleLogin = (token, user) => {
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      setUser(user);
      showSnackbar("Login successful! Welcome back!", "success");
    } catch (err) {
      console.error('Error setting login state:', err);
      showSnackbar("Failed to save login information", "error");
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
      showSnackbar("Logout successful! See you again!", "info");
    } catch (err) {
      console.error('Error during logout:', err);
      showSnackbar("Failed to logout properly", "error");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh'}}>
      <Navbar />
      <Router>
        <Box className="App">
          <SnackbarComponent
            snackbar={snackbar}
            onClose={closeSnackbar}
          />

          <Routes>
            <Route
              path="/login"
              element={
                !token ? (
                  <Login onLogin={handleLogin} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                token ? (
                  <Dashboard user={user} onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
          </Routes>
        </Box>
      </Router>
      <Footer />
    </Box>
  );
}

export default App;