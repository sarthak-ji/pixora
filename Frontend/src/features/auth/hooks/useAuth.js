import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { register, login } from "../services/auth.api.js";


export function useAuth(){

    const context = useContext(AuthContext);

    const { user, setUser, loading, setLoading } = context;


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

    return {
        user, loading, handleLogin, handleRegister
    }

}