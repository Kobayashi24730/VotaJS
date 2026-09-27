import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Home } from "@/pages/home";
import { Navbar } from "@/components/navbar";
import './App.css'

function MainLayout() {
  return (
    <SidebarProvider className="flex min-h-screen w-full">
      <Navbar />
      <SidebarInset className="flex flex-1 flex-col min-w-0 w-full bg-background transition-[margin] duration-200 ease-linear">
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
