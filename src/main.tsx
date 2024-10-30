import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {AuthProvider} from "@/contexts/AuthContext.tsx";
import {BrowserRouter} from "react-router-dom";
import { QueryClient, QueryClientProvider } from  "@tanstack/react-query";
import { Toaster } from './components/ui/toaster.tsx';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <BrowserRouter>
                    <QueryClientProvider client={queryClient}>
                         <App />
                         <Toaster />
                     </QueryClientProvider>
                </BrowserRouter>
            </ThemeProvider>
        </AuthProvider>
    </StrictMode>
)
