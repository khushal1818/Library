import React from 'react'
import { protectedRouteStyles as s } from '../assets/dummyStyles';
import { useAuth } from './AuthContext';
import { Form, Navigate, Outlet, replace, useLocation } from 'react-router-dom';

const ProctectedRoute = ({allowedRole}) => {
    const {currentUser, ready} = useAuth();
    const locatins = useLocation();

    if (!ready) {
        console.log("Protected Route: Auth not ready yet");
        return (
            <div className={s.loadingContainer}>
                <div className={s.loadingCard}>Loading your library workspace</div>
            </div>
        );
    }

    if (!currentUser) {
        const hasToken = localStorage.getItem("library-auth-token");
        console.log("Protected Route: No currentUser. HasToken:",
            !!hasToken,
            "AllowedRole",
            allowedRole,
        );
        if (hasToken) {
            return (
                <div className={s.loadingContainer}>
                    <div className={s.loadingCard}>
                        Syncing your workspace...
                    </div>
                </div>
            );
        }

        return <Navigate to="/login" replace state={{from: locatins.pathname}} />; 
    }

    console.log("Protected Route: CurrentUser:",
        currentUser.role,
        "AllowedRole",
        allowedRole,
    );

    if (currentUser.role !== allowedRole) {
        console.warn("ProtectedRoute: Role mismatch! Redirecting to login");
        return <Navigate to="/login" replace state={{
            from: locatins.pathname,
        }}
    />
    }

    console.log("ProtectedRoute : Access Granted");
  return <Outlet/>

};

export default ProctectedRoute