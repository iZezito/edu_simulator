import React, {createContext, useState, useEffect, useContext} from "react";
import { login, logout, isAuthenticated } from "../services/auth";

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    user: User | null;
}

interface User {
    id: string;
    name: string;
    email: string;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [authenticated, setAuthenticated] = useState<boolean>(isAuthenticated());

    useEffect(() => {
        if (authenticated) {
            // pegar dados do usuário se necessário
        }
    }, [authenticated]);

    const handleLogin = async (email: string, password: string) => {
        const response = await login({ email, password });
        setUser(response.user);
        setAuthenticated(true);
    };

    const handleLogout = () => {
        logout();
        setUser(null);
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: authenticated, login: handleLogin, logout: handleLogout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextProps {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
