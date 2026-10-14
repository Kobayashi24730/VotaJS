import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Upload, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AnimateSections } from "@/components/animateSections";
import { useAuth } from "@/context/AuthContext";
import { usePolls } from "@/hooks/usePolls";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function Settings() {
  const { user, loading, logout: authLogout, deleteAccount: userDeleteAccount } = useAuth();
  const { polls, deletePoll } = usePolls();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      NomeCompleto: user?.nome || user?.email || "undefined",
      email: user?.email || "undefined",
    },
  });
  const {isDirty} = form.formState;

  const onSubmitInfos = async (dados) => {
    if (loading) {
      return (
        <>
          <h1>Carregando...</h1>
        </>
      );
    }

    const response = await update(dados.email);
    if (response.success) {
      toast.success("Informações atualizadas com sucesso!");
      form.reset(dados); //? reseta com os novos dados.
    } else {
      toast.error("Erro ao atualizar informações.");
    }
  };

  const deleteAccount = async (email) => {
    try {
      await userDeleteAccount(email);
      toast.success("Conta deletada com sucesso!");
      authLogout();
    } catch (err) {
      toast.error("Erro ao deletar conta.");
    }
  };

  const logout = async () => {
    try {
      await authLogout();
      toast.success("Deslogado com sucesso!");
      navigate("/auth");
    } catch (err) {
      toast.error("Erro ao deslogar.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6 bg-slate-50/50 min-h-screen">
      {/* Foto de Perfil */}
      <AnimateSections delay={0.1}>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
          <h3 className="text-base font-semibold text-slate-900">Foto</h3>
          <p className="text-sm text-slate-500 mb-4">
            Mudar a foto de perfil
          </p>

          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
              <img
                src="https://avatar.vercel.sh/shadcn1"
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2 border-slate-300 text-slate-700 font-medium rounded-lg"
                >
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2 border-slate-300 text-slate-700 font-medium rounded-lg"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </Button>
              </div>
              <p className="text-xs text-slate-500">
                No máximo 1MB. Formatos suportados: jpg, jpeg, png.
              </p>
            </div>
          </div>
        </div>
      </AnimateSections>

      {/* Detalhes Pessoais */}
      <AnimateSections delay={0.2}>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
          <Form {...form}>
            <form className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Seus detalhes</h3>
                  <p className="text-sm text-slate-500">
                    Confira seus detalhes pessoais
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!isDirty}
                    className="bg-slate-600 hover:bg-slate-700 text-white font-medium rounded-lg px-4"
                    onClick={() => onSubmitInfos(setNewNome)}
                  >
                    Salvar alterações
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-slate-300 text-slate-600 font-medium rounded-lg px-4"
                    onClick={() => form.reset()}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <FormField
                  control={form.control}
                  name="NomeCompleto"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm font-medium text-slate-900">
                        Nome completo
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nome completo"
                          {...field}
                          className="rounded-lg border-slate-300 focus-visible:ring-slate-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm font-medium text-slate-900">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          {...field}
                          className="rounded-lg border-slate-300 focus-visible:ring-slate-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
      </AnimateSections>

      {/*Zona para Deletar Conta */}
      <AnimateSections delay={0.3}>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Zona para deletar ou deslogar a conta</h3>
            <p className="text-sm text-slate-500">
              Delete ou deslogue sua conta e todos os seus dados
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg font-medium"
              onClick={() => deleteAccount(user.email)}
            >
              Deletar conta
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg font-medium"
              onClick={() => logout()}
            >
              Logout
            </Button>
          </div>
        </div>
      </AnimateSections>

      <AnimateSections delay={0.4}>
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">Painel de Administração de Enquetes</h2>
            <p className="text-xs text-slate-500 mt-0.5">Gerencie e visualize as enquetes criadas por si.</p>
          </div>

          {polls.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {polls.map((p, index) => (
                <div 
                  key={p.id}
                  className="flex flex-col justify-between border border-slate-200/80 bg-slate-50/50 rounded-xl p-4 transition-all hover:shadow-md hover:border-slate-300"
                >
                  <div className="space-y-1 mb-4">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Card #{index + 1}
                    </span>
                    <p className="text-sm font-semibold text-slate-800 line-clamp-2">
                      {p.question || p.title || "Enquete sem título"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="w-full text-xs h-8 shadow-xs"
                      onClick={() => deletePoll(p.id, user.email)}
                    >
                      Excluir
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full text-xs h-8 bg-white border-slate-200 hover:bg-slate-100"
                    >
                      Ver mais
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border border-dashed border-slate-200 rounded-xl bg-slate-50/30">
              <p className="text-sm text-slate-400 italic">
                Nenhum card criado ainda. Suas enquetes aparecerão aqui.
              </p>
            </div>
          )}
        </div>
      </AnimateSections>
    </div>
  )
}