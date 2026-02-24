"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useLoginMutation, useRegisterMutation } from "@/store/api/frontendApi";

interface User {
    id?: number;
    name: string;
    email: string;
    phone: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (credentials: any) => Promise<any>;
    register: (userData: any) => Promise<any>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [loginApi] = useLoginMutation();
    const [registerApi] = useRegisterMutation();

    useEffect(() => {
        const savedUser = localStorage.getItem("alinggon_user");
        const savedToken = localStorage.getItem("alinggon_token");
        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
        }
        setIsLoading(false);
    }, []);

    const login = async (credentials: any) => {
        try {
            const response = await loginApi(credentials).unwrap();
            if (response.success) {
                const userData = response.user;
                const userToken = response.access_token;
                setUser(userData);
                setToken(userToken);
                localStorage.setItem("alinggon_user", JSON.stringify(userData));
                localStorage.setItem("alinggon_token", userToken);
                return { success: true };
            }
        } catch (error: any) {
            return { success: false, message: error.data?.message || "Login failed" };
        }
    };

    const register = async (userData: any) => {
        try {
            const response = await registerApi(userData).unwrap();
            if (response.success) {
                const newUser = response.user;
                const userToken = response.access_token;
                setUser(newUser);
                setToken(userToken);
                localStorage.setItem("alinggon_user", JSON.stringify(newUser));
                localStorage.setItem("alinggon_token", userToken);
                return { success: true };
            }
        } catch (error: any) {
            return { success: false, message: error.data?.message || "Registration failed" };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("alinggon_user");
        localStorage.removeItem("alinggon_token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
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
