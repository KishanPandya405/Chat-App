import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import Auth from './components/Auth';
import ChatRoom from './components/ChatRoom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  /*useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Logged in user:', user);
        setUser(user); // Set user if logged in
      } else {
        console.log('No user is logged in');
        setUser(null); // Clear user if logged out
      }
      setLoading(false); // Set loading to false once checked
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show loading message while checking auth state
  }*/

  return (
    <Router>
      <div className="App">
        <Routes>
          {!user ? (
            <Route path="/" element={<Auth onLogin={setUser} />} /> // Render Auth if no user
          ) : (
            <Route path="/" element={<ChatRoom user={user} />} /> // Render ChatRoom if user is logged in
          )}
          {/* Optional redirect for /auth */}
          <Route path="/auth" element={user ? <Navigate to="/" replace /> : <Auth onLogin={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
