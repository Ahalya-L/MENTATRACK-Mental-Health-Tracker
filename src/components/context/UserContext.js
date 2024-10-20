import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (user) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const getEmail = () => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser).email : null;
    };

    return (
        <UserContext.Provider value={{ user, login, logout, getEmail }}>
            {children}
        </UserContext.Provider>
    );
};
