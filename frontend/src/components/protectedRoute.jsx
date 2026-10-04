import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function ProtectedRoute() {
    const { signed, loading } = useAuth();

    if (loading) {
        return <div lassName="flex h-screen items-center justify-center">A carregar...</div>
    }

    if (!signed) {
        return <Navigate to="/auth" replace />
    }

    return <Outlet/>
}