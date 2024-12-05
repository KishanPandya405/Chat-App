import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { database } from '../firebaseConfig'; // Ensure this is imported
import { ref, set } from 'firebase/database'; // Import database methods
import '../Styles/Auth.css';

const Auth = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState(''); // For signup display name
    const [error, setError] = useState('');

    const handleAuth = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message on each attempt
        try {
            if (isLogin) {
                // Login logic
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                onLogin(userCredential.user);
            } else {
                // Signup logic with display name
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Set display name after signup
                await updateProfile(user, { displayName: displayName });
                
                // Now update user details in the database
                await updateProfileInDatabase(user);

                onLogin(user); // Log in the user after signup
            }
        } catch (err) {
            setError(err.message); // Display any errors
        }
    };

    const updateProfileInDatabase = async (user) => {
        const userRef = ref(database, 'users/' + user.uid);
        await set(userRef, {
            displayName: user.displayName, // Ensure display name is stored
            email: user.email,
        });
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleAuth}>
                {/* Only show display name input if signing up */}
                {!isLogin && (
                    <input
                        type="text"
                        placeholder="Display Name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit" className="btn">
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
                <p onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Create an account' : 'Already have an account? Login'}
                </p>
            </form>
        </div>
    );
};

export default Auth;
