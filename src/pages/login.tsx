import {Link, useNavigate} from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { LoginData, loginSchema} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import { useAuth } from "@/contexts/AuthContext.tsx";



export const description =
    "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account."

export function LoginForm() {
    const navigate = useNavigate();
    const { login, loading } = useAuth()

    const form = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const onSubmit = async (data: LoginData) => {
        console.log("login", data)
        await login(data).then(() => navigate("/")).catch((error) => {
            console.log(error);
            form.setError("root", { type: 'manual', message: "E-mail ou senha inválidos" });
        })
    }

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="mx-auto max-w-sm mt-10">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Insira suas credenciais abaixo para fazer login em sua conta
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                {form.formState.errors.root && <span className="text-red-500 text-left text-sm">{form.formState.errors.root.message}</span>}
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="voce@provedor.com.br"
                                            required
                                            {...field}
                                            disabled={loading}
                                        />
                                    </FormControl>
                                    <FormDescription className="hidden">Seu e-mail.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                    <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="******"
                                            required
                                            {...field}
                                            disabled={loading}
                                        />
                                    </FormControl>
                                    <FormDescription className="hidden">Sua senha.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Não possui uma conta?{" "}
                    <Link to="/signup" className="underline">
                        Cadastre-se
                    </Link>
                </div>
            </CardContent>
        </Card>
        </form>
        </Form>
    )
}
