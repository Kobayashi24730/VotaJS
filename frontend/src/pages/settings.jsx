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

export function Settings() {
  const form = useForm({
    defaultValues: {
      fullName: "Alex Morgan",
      email: "alex.morgan@nexacrm.app",
    },
  })

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6 bg-slate-50/50 min-h-screen">
      {/* 1. Kumpunente para iti Litrato (Picture) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
        <h3 className="text-base font-semibold text-slate-900">Picture</h3>
        <p className="text-sm text-slate-500 mb-4">
          Shown on your records and in the members list.
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
              We support square PNGs, JPEGs and GIFs under 10MB.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Kumpunente para iti Detalye (Your details) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
        <Form {...form}>
          <form className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Your details</h3>
                <p className="text-sm text-slate-500">
                  How you appear to everyone in the workspace.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="submit"
                  size="sm"
                  className="bg-slate-600 hover:bg-slate-700 text-white font-medium rounded-lg px-4"
                >
                  Save changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-slate-300 text-slate-600 font-medium rounded-lg px-4"
                >
                  Cancel
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-sm font-medium text-slate-900">
                      Full name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Full name"
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
                      Email address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email address"
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

      {/* 3. Kumpunente para iti Danger Zone */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Danger zone</h3>
          <p className="text-sm text-slate-500">
            Delete your account and everything associated with it.
          </p>
        </div>

        <div>
          <Button
            type="button"
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg font-medium"
          >
            Delete account
          </Button>
        </div>
      </div>
    </div>
  )
}