import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/api/api";
import { locales } from "zod";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const token = localStorage.getItem("@App:token");
        const user = localStorage.getItem("@App:user");

        if (token && user) {
            setUser(JSON.parse(user));
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post("auth/login", {email, password});
            const { user, token } = response.data;
            setUser(user);

            localStorage.setItem("@App:token", token);
            localStorage.setItem("@App:user", JSON.stringify(user));
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            return {success: true}
        } catch (error) {
            return {success: false, message: error.response?.data?.message || "Erro no login"}
        }
    }

    const register = async (nome,email,password) => {
        try {
            const response = await api.post("auth/register", {nome, email, password});
            const res = response.data;
            return {success: true, message: res.message}
        } catch (err) {
            return {success: false, message: err.response?.data?.message || "Erro no cadastro"}
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("@App:token");
        localStorage.removeItem("@App:user");
        delete api.defaults.headers.common["Authorization"];
    }
    return (
        <AuthContext.Provider value={{ 
            signed: !!user, //? boolean true para o usuario quando ele estiver logado
            user,
            loading,
            login,
            register,
            logout,
         }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext );