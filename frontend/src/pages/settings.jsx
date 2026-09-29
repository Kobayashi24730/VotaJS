import React from "react"
import { useForm } from "react-hook-form"
import { Upload, Trash2 } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { AnimateSections } from "@/components/animateSections"

export function Settings() {
  const form = useForm({
    defaultValues: {
      NomeCompleto: "Nome incluir",
      email: "Nome.incluir@nexacrm.app",
    },
  })

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
                    className="bg-slate-600 hover:bg-slate-700 text-white font-medium rounded-lg px-4"
                  >
                    Salvar alterações
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-slate-300 text-slate-600 font-medium rounded-lg px-4"
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
            <h3 className="text-base font-semibold text-slate-900">Zona para deletar conta</h3>
            <p className="text-sm text-slate-500">
              Delete sua conta e todos os seus dados
            </p>
          </div>

          <div>
            <Button
              type="button"
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg font-medium"
            >
              Deletar conta
            </Button>
          </div>
        </div>
      </AnimateSections>
    </div>
  )
}