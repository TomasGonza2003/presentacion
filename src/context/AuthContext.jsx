import React, { createContext, useState, useEffect, useContext } from 'react';
// Importamos el servicio real para conectar con AWS
import AuthService from '../services/auth.service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuarioLogueado, setUsuarioLogueado] = useState(null);
    const [loading, setLoading] = useState(true);

    // Al cargar la página, verificamos si hay un usuario guardado en el navegador
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setUsuarioLogueado(user);
        }
        setLoading(false);
    }, []);

    // Función LOGIN conectada al Backend
    const login = async (username, password) => {
        try {
            //Llamamos al servicio real (Axios -> EC2)
            const data = await AuthService.login(username, password);

            setUsuarioLogueado(data);

            return { success: true, usuario: data, roles: data.roles };
        } catch (error) {
            console.error("Error en AuthContext login:", error);
            const message = error.response?.data?.message || "Error de credenciales";
            throw { response: { data: { message } } };
        }
    };

    // Función REGISTRO conectada al Backend
    const register = async (username, email, password) => {
        // El registro no loguea automáticamente, solo crea el usuario
        return AuthService.register(username, email, password);
    };

    // Función LOGOUT
    const logout = () => {
        AuthService.logout();
        setUsuarioLogueado(null); // Limpiamos el estado global
    };

    const value = {
        usuarioLogueado,
        login,
        register,
        logout,
        loading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};