import { Calendar, Home, Inbox, Search, Settings, Vote, LogOut, User } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

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

// Menu de itens da navegação com rotas do React Router
const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Inbox", url: "/inbox", icon: Inbox },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Search", url: "/search", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function Navbar() {
  const location = useLocation()
  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-border/60 bg-sidebar/95 backdrop-blur-sm">
      {/* Topo / Branding */}
      <SidebarHeader className="p-4 border-b border-border/40">
        <Link to="/" className="flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Vote className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight leading-none text-sidebar-foreground">
              VotaJS
            </span>
            <span className="text-xs text-muted-foreground mt-1">Painel Administrativo</span>
          </div>
        </Link>
      </SidebarHeader>

      {/* Conteúdo Principal de Navegação */}
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 px-2 mb-2">
            Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => {
                const isActive = location.pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="w-full justify-start gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:font-semibold"
                    >
                      <Link to={item.url}>
                        <item.icon className={`h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                        <span>{item.title}</span>
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
      <SidebarFooter className="p-3 border-t border-border/40">
        <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-muted/40 hover:bg-muted/70 transition-colors">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-semibold text-xs border border-border">
              <User className="h-4 w-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-medium text-foreground leading-tight">Ajent</span>
              <span className="text-[10px] text-muted-foreground">admin@votajs.com</span>
            </div>
          </div>
          <button
            title="Sair"
            className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded-md hover:bg-background"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}