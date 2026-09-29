import { Calendar, Home, Inbox, Search, Settings, Vote, LogOut, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Inbox", url: "/inbox", icon: Inbox },
  { title: "Pesquisar", url: "/pesquisar", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function Navbar() {
  const location = useLocation()

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="border-r border-slate-200 bg-white shadow-sm transition-all duration-200"
    >
      {/* Topo / Branding */}
      <SidebarHeader className="p-4 border-b border-slate-100">
        <Link to="/" className="flex items-center gap-3 px-1 group">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex h-9 w-9 items-center justify-center rounded-md bg-[#0078d4] text-white shadow-sm transition-transform group-hover:scale-105"
          >
            <Vote className="h-5 w-5" />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-semibold text-base tracking-tight leading-none text-slate-900">
              Vota<span className="text-[#0078d4]">JS</span>
            </span>
            <span className="text-[11px] text-slate-500 mt-1 font-medium">
              Painel Administrativo
            </span>
          </div>
        </Link>
      </SidebarHeader>

      {/* Conteúdo Principal de Navegação */}
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 mb-2">
            Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => {
                const isActive = location.pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActive}
                      className="relative w-full justify-start gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100/80 data-[active=true]:bg-blue-50 data-[active=true]:text-[#0078d4] data-[active=true]:font-semibold"
                    >
                      <Link to={item.url} className="flex items-center gap-3 w-full relative z-10">
                        {/* Indicador lateral do Fluent UI */}
                        {isActive && (
                          <motion.div
                            layoutId="active-pill"
                            className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#0078d4] rounded-r-full"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <item.icon
                          className={`h-4 w-4 transition-colors ${
                            isActive ? "text-[#0078d4]" : "text-slate-500 group-hover:text-slate-700"
                          }`}
                        />
                        <span className={isActive ? "text-[#0078d4]" : "text-slate-700"}>
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Rodapé / Perfil do Usuário */}
      <SidebarFooter className="p-3 border-t border-slate-100">
        <div className="flex items-center justify-between px-2.5 py-2 rounded-md bg-slate-50 border border-slate-200/60 hover:bg-slate-100/80 transition-colors">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-300/50">
              <User className="h-4 w-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-900 leading-tight">Ajent</span>
              <span className="text-[10px] text-slate-500 font-medium">admin@votajs.com</span>
            </div>
          </div>
          <button
            title="Sair"
            className="text-slate-400 hover:text-red-600 transition-colors p-1.5 rounded-md hover:bg-white hover:shadow-sm"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}