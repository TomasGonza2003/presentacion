import api from './api';

const register = (username, email, password) => {
    return api.post('/auth/signup', {
        username,
        email,
        password,
        role: ['cliente']
    });
};

const login = (username, password) => {
    return api
        .post('/auth/signin', {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken || response.data.token) {
                const token = response.data.accessToken || response.data.token;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;