import React, { useState } from 'react';
import LoginForm from './LoginForm';
import './Login.css';
import { login } from '../../services/authService';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await login(username, password);
            localStorage.setItem('token', data.token);
            onLogin(); // NAVIGATE TO INSTITUTIONS
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
            loading={loading}
            error={error}
        />
    );
};

export default Login;