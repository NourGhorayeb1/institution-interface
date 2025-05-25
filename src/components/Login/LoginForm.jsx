import React from 'react';

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin, loading, error }) => {
    return (
        <div className="login-container">
            <img src="/logo.png" alt="Company Logo" className="logo" />
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
                <p>Don't have an account? <a href="/signup">Sign up here</a></p>
            </form>
        </div>
    );
};

export default LoginForm;