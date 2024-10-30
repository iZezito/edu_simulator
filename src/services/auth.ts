import { LoginData } from "@/types/index.ts";
import api from "./api.ts";
import {setCookie, destroyCookie, parseCookies} from "nookies";
import { AxiosResponse } from "axios";

export type AuthResponse = {
    token: string;
    usuario:string;
}


export const login = async (data: LoginData): Promise<AxiosResponse<AuthResponse>> => {
    const response = await api.post<AuthResponse>('/login', { login: data.email, senha: data.password });
    
    // Armazena o token nos cookies
    if(response?.status === 200) {
        setCookie(null, 'token', response.data.token, {
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });
    }
    

    return response; // Retorna o objeto completo de response do Axios
};


export const logout = () => {
    destroyCookie(null, 'token');
};


export const isAuthenticated = (): boolean => {
    const cookies = parseCookies();
    return !!cookies['token'];
};
