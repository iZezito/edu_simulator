import React, {createContext, useState, useEffect, useContext} from "react";
import { login, logout, isAuthenticated, AuthResponse } from "../services/auth";
import { LoginData } from "@/types";
import { AxiosResponse } from "axios";

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (login: LoginData) => Promise<AxiosResponse<AuthResponse>>;
    logout: () => void;
    loading: boolean;
    setAuhtorized: (isAuthorized: boolean) => void;
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

    const handleLogin = async (loginData: LoginData): Promise<AxiosResponse<AuthResponse>>=> {
        setLoading(true);
        return await login(loginData).then((response) => {
            if(response.status === 202) return response;
            setAuthenticated(true);
            return response;
        }).finally(() => {
            setLoading(false);  
        });
    };

    const handleLogout = () => {
        logout();
        setAuthenticated(false);
    };

    const setAuhtorized = (isAuthorized: boolean) => {
        setAuthenticated(isAuthorized);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: authenticated, login: handleLogin, logout: handleLogout, loading, setAuhtorized }}>
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
