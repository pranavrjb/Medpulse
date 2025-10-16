import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log('Decoded Token:',decoded)
                setUser(decoded);
            } catch (error) {
                console.error('Invalid token:', error);
                localStorage.removeItem('token');
                setUser(null)
            }
        }
        sessionStorage.setItem('isReload', 'true');

        const handleBeforeUnload = (e) => {
            if (sessionStorage.getItem('isReload')) {
                localStorage.removeItem('isReload');
            }
        }
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        setUser(decoded);
    };

    const logout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('isReload');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
