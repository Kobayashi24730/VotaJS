import React, { createContext, useContext, useState } from "react";

const authContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState({ name: "Ajent"});

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(authContext);