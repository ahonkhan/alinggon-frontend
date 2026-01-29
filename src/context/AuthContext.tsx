"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
    name: string;
    email: string;
    phone: string;
    isLoggedIn: boolean;
}

interface AuthContextType {
    user: User | null;
    login: (phone: string, name: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("alinggon_user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (phone: string, name: string) => {
        const newUser = { name, email: name.toLowerCase().replace(" ", ".") + "@example.com", phone, isLoggedIn: true };
        setUser(newUser);
        localStorage.setItem("alinggon_user", JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("alinggon_user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
