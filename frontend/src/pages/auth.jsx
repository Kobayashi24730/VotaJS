import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AnimateSections } from "@/components/animateSections";
import loginImg from "@/assets/login.jpg";
import registerImg from "@/assets/register.jpg";
import votaLogo from "@/assets/votaLogo.svg";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido." }),
  password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),
});

const registerSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter no mínimo 2 caracteres." }),
  email: z.string().email({ message: "Email inválido." }),
  password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),
})

export function Auth() {
  const [isFormType, setIsFormType] = useState("login");
  const { login, register } = useAuth();
  const currentFormSchema = isFormType === "login" ? loginSchema : registerSchema;
  const form = useForm({
    resolver: zodResolver(currentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const toggleFormType = () => {
    const nextFormType = isFormType === "login" ? "register" : "login";
    setIsFormType(nextFormType);
    form.reset({ name: "", email: "", password: "" });
  }
  const onSubmit = async (data) => {
    if (isFormType === "login") {
      login(data.email, data.password);
      toast.success("Login efetuado com sucesso!");
    } else if (isFormType === "register") {
      register(data.name, data.email, data.password);
      toast.success("Cadastro efetuado com sucesso!");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-100 p-4 sm:p-6">
      <AnimateSections delay={0.3}>
        <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl border border-slate-100 min-h-[550px]">
          <div className="flex w-full flex-col justify-between p-8 md:w-1/2 lg:p-12">
            <div className="flex items-center gap-2">
              <img src={votaLogo} alt="Logo VotaJs" className="h-8 w-8" />
              <h2 className="text-xl font-bold text-slate-900">
                Vota<span className="text-[#0078d4]">Js</span>
              </h2>
            </div>

            <div className="my-auto py-6">
              <h3 className="text-2xl font-bold text-slate-900">{isFormType === "login" ? "Bem-vindo!" : "Crie sua conta"}</h3>
              <p className="mt-2 text-sm text-slate-500">
                {isFormType === "login"
                  ? "Para continuar, faça login e comece a votar em enquetes imperdíveis."
                  : "Preencha os dados abaixo para se cadastrar na plataforma."}
              </p>

              {/* Form base com a ui form do shadcn */}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mt-6 space-y-4"
                >
                  {isFormType === "register" && (  
                    <FormField
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700">
                            Seu Nome
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Informe seu nome"
                              className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-[#0078d4]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Informe seu email"
                            className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-[#0078d4]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                          <FormLabel className="text-slate-700">Senha</FormLabel>
                          <FormControl>
                              <Input
                                  type="password"
                                  placeholder="Informe sua senha"
                                  className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-[#0078d4]"
                                  {...field}
                              />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="h-11 w-full bg-[#0078d4] font-medium text-white hover:bg-[#0063b1] transition-colors"
                  >
                    Entrar
                  </Button>
                </form>
              </Form>
            </div>

            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} VotaJs. Todos os direitos
              reservados.
            </p>
          </div>

          <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center p-8 text-white text-center relative overflow-hidden">
          {/* Imagem de fundo cobrindo toda a div */}
          <img
            src={isFormType === "login" ? loginImg : registerImg}
            alt="Fundo VotaJs"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Overlay escuro com gradiente para garantir contraste e legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/70 to-slate-900/40" />

          {/* Conteudo sobre a imagem */}
          <div className="relative z-10 flex flex-col items-center gap-6 max-w-sm">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold leading-snug text-white drop-shadow-sm">
                {isFormType === "login" ? (
                  <>
                    Não tem uma <span className="text-[#0078d4]">Conta</span>?
                  </>
                ) : (
                  <>
                    Já possui uma <span className="text-[#0078d4]">Conta</span>?
                  </>
                )}
              </h2>
              <p className="text-sm text-slate-200 drop-shadow-sm">
                {isFormType === "login" 
                  ? "Faça seu registro agora mesmo e participe das votações em tempo real."
                  : "Acesse sua conta para ver suas enquetes e votos guardados."}
              </p>
            </div>

            <Button
              variant="outline"
              onClick={() => toggleFormType()}
              className="mt-2 border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-slate-900 transition-all shadow-lg"
            >
              {isFormType === "login" ? "Criar Conta" : "Fazer Login"}
            </Button>
          </div>
        </div>
        </div>
      </AnimateSections>
    </div>
  );
}
