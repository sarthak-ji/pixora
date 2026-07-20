import { AuthContext } from "./auth.context.jsx";
import {register, login} from "./services/auth.api"
import { useState } from "react";


export function AuthProvider({children}){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleRegister = async (username, email, password) => {
        
        setLoading(true);

        try {
            const response = await register(username, email, password);
            setUser(response.user)
        } catch (err) {
            console.error(err);
            throw err
        } finally{
            setLoading(false);
        }
    }

    const handleLogin = async (username, password) => {

        setLoading(true);

        try {
            const response = await login(username, password);
            setUser(response.user)
        } catch (err) {
            console.error(err);
            throw err
        } finally{
            setLoading(false);
        }
    }


    return (
        <AuthContext.Provider value={{user, loading, handleRegister, handleLogin}} >
            {children}
        </AuthContext.Provider>
    )
}