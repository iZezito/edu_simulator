import React, {createContext, useState, useEffect, useContext} from "react";
import { login, logout, isAuthenticated } from "../services/auth";
import { LoginData } from "@/types";

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (login: LoginData) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

// interface User {
//     id: string;
//     name: string;
//     email: string;
// }

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // const [user, setUser] = useState<User | null>(null);
    const [authenticated, setAuthenticated] = useState<boolean>(isAuthenticated());
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (authenticated) {
            // pegar dados do usuário se necessário
        }
    }, [authenticated]);

    const handleLogin = async (loginData: LoginData) => {
        setLoading(true);
        return await login(loginData).then(() => {
            setAuthenticated(true);
        }).finally(() => {
            setLoading(false);  
        });
    };

    const handleLogout = () => {
        logout();
        // setUser(null);
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: authenticated, login: handleLogin, logout: handleLogout, loading }}>
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
