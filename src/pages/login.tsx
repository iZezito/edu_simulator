import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { setCookie } from "nookies";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const otpSchema = z.object({
  code: z.string().length(6, "O código deve ter 6 dígitos"),
});


type LoginData = z.infer<typeof loginSchema>;
type OTPData = z.infer<typeof otpSchema>;
type FormData = LoginData & OTPData;

export function LoginForm() {
  const navigate = useNavigate();
  const { login, setAuhtorized } = useAuth();
  const [requires2FA, setRequires2FA] = useState(false);
  const [loginData, setLoginData] = useState<LoginData | null>(null);

  const schema = requires2FA ? otpSchema : loginSchema;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (requires2FA) {
      
      if (loginData) {
        await api.post('/login/validate-2fa', null, {
          params: {
            username: loginData.email || "",
            code: data?.code || "",
          },
        }).then((response) => {
          setCookie(null, 'token', response.data.token, {
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
          });
          setAuhtorized(true);
          navigate("/");
        }).catch((error) => {
          console.error(error);
          // Mantenha o estado requires2FA e mostre a mensagem de erro
          form.setError("code", {
            type: "manual",
            message: error?.response?.data || "Código OTP inválido",
          });
        });
      }
    } else {
      // Handle login submission
      await login(data).then((response) => {
        if (response.status === 202) {
          setRequires2FA(true);
          setLoginData(data);
        } else {
          navigate("/");
        }
      }).catch((error) => {
        console.error(error);
        form.setError("root", {
          type: "manual",
          message: error?.response?.data || "E-mail ou senha inválidos",
        });
      });
    }
  };

  return (
    <Card className="mx-auto max-w-sm mt-10">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          {requires2FA
            ? "Digite o código de verificação enviado para o seu dispositivo"
            : "Insira suas credenciais abaixo para fazer login em sua conta"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {form.formState.errors.root && (
              <span className="text-red-500 text-left text-sm">
                {form.formState.errors.root.message}
              </span>
            )}
            {!requires2FA && (
              <>
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
                          autoComplete="email"
                          required
                          {...field}
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="******"
                          autoComplete="current-password"
                          required
                          {...field}
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {requires2FA && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código de Verificação</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (requires2FA ? "Verificando..." : "Carregando...") : (requires2FA ? "Verificar" : "Login")}
            </Button>
            <div className="mt-4 text-center text-sm">
              Não possui uma conta?{" "}
              <Link to="/signup" className="underline">
                Cadastre-se
              </Link>
            </div>
            <div className="mt-4 text-center text-sm">
              <Link to="/forgot-password" className="underline">
                Esqueceu sua senha?
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}



