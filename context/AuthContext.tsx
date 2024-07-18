'use client'

import React, {createContext, useContext, useState, ReactNode} from "react";
import { toast } from "react-toastify";

// Interface for Context
type AuthContextType = {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
};

//Creating the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//creating the provider
export const AuthProvider = ({children}: {children: ReactNode}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => {
        setIsAuthenticated(true);
        toast.success('Successfully logged in !');
    }
    const logout = () => {
        setIsAuthenticated(false);
        toast.success('Successfully logged out !');
    }
    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

// custom hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};