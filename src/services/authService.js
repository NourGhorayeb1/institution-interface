export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) throw new Error('Invalid credentials');
    return await response.json();
};

export const logout = async () => {
    const token = localStorage.getItem('token');
    return await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};