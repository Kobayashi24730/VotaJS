import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Home } from "@/pages/home";
import { Navbar } from "@/components/navbar";
import './App.css'

function MainLayout() {
  return (
    <SidebarProvider className="flex min-h-screen w-full">
      <Navbar />
      <SidebarInset className="flex flex-1 flex-col min-w-0 w-full bg-background transition-[margin] duration-200 ease-linear">
        <header className="flex h-14 items-center gap-4 border-b border-border bg-background px-6">
          <SidebarTrigger />
          <span className="text-sm font-semibold">Painel VotaJS</span>
        </header>

        <main className="flex-1 w-full p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />} >
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
