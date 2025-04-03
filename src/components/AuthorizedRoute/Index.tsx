import { useCallback } from "react";
import { Navigate, ScrollRestoration } from "react-router-dom";
import { UseAuthInterface, useAuth } from "../../store/auth";

export const AuthorizedRoute = ({ children }: any) => {
    const isLoggedIn = useAuth((state: UseAuthInterface) => state.isLoggedIn);

    const hasPermission = useCallback(() => {
        if (isLoggedIn) return true;
        return false;
    }, [isLoggedIn]);

    return (
        <>
            <ScrollRestoration />
            {!hasPermission() ? <Navigate to="/login" /> : children}
        </>
    );
};
