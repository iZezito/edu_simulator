import api from "./api.ts";
import {setCookie, destroyCookie, parseCookies} from "nookies";

interface LoginData {
    email: string;
    password: string;
}

interface AuthResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}


export const login = async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);


    setCookie(null, 'token', response.data.token, {
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    });

    return response.data as AuthResponse;
};


export const logout = () => {

    destroyCookie(null, 'token');
    window.location.href = '/login';
};


export const isAuthenticated = (): boolean => {
    const cookies = parseCookies();
    return !!cookies['token'];
};
