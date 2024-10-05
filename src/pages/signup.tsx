import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CreateUser, User, userSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useService } from "@/hooks/use-service";
import { useToast } from "@/hooks/use-toast";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";


export const description =
    "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account"

export function SignupForm() {
    const navigate = useNavigate();
    const { toast } = useToast();

    const {create, isPending} = useService<User>("usuarios");


    const form = useForm<CreateUser>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            nome: "",
            login: "",
            senha: ""
        },
    })

    const onSubmit = async (data: CreateUser) => {
        console.log("login", data)
        await create(data).then(() => {
            toast({
                title: "Sucesso",
                description: `Usuário ${data.nome} criado com sucesso`,
            })
            navigate("/login")

        }).catch((error) => {
            console.log(error);
            form.setError("root", { type: 'manual', message: "E-mail ou senha inválidos" });
        })
    }


return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <Card className="mx-auto max-w-sm mt-10">
        <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
                Enter your information to create an account
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                {form.formState.errors.root && <span className="text-red-500 text-left text-sm">{form.formState.errors.root.message}</span>}
                    <div className="grid gap-2">
                    <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Neymar"
                                        required
                                        {...field}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormDescription className="hidden">Seu nome</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                    <div className="grid gap-2">
                    <FormField
                        control={form.control}
                        name="login"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Login</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Neymar"
                                        required
                                        {...field}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormDescription className="hidden">Seu login.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                </div>
                <div className="grid gap-2">
                <FormField
                        control={form.control}
                        name="senha"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="******"
                                        required
                                        {...field}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormDescription className="hidden">Sua senha.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                    Criar conta
                </Button>
            </div>
            <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to={'/login'} className="underline">
                    Sign in
                </Link>
            </div>
        </CardContent>
    </Card>
    </form>
    </Form>
)
}
