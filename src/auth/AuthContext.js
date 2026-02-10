import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../api/supabase";


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);

    const signUpUser = async (email, password, name, surnames, username) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name,
                    surnames: surnames,
                    username: username,
                    games_played: 0,
                    n_successes: 0,
                    n_failures: 0,
                    ratio: 0
                }
            }
        });

        if (error) {
            console.log('error en signUpUser de AuthContext', error);
            return { success: false, error: error }
        }
        return { success: true, data }
    }

    const signInUser = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
            if (error) {
                console.log('error en signInUser de AuthContext', error);
                return { success: false, error: error }
            }
            return { success: true, data }
        }

        catch (error) {
            console.error('error en signInUser de AuthContext', error);
            return { success: false, error: error }
        }
    }

    const signOutUser = () => {
        const { error } = supabase.auth.signOut();
        if (error) {
            console.log('error en signOut de AuthContext', error)
        }
    }

    const changeUserPassword = async (newPassword) => {
        const { error } = await supabase.auth.updateUser({
            password: newPassword
        });
        if (error) {
            console.log('error en changeUserPassword de AuthContext', error)
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        })
    }, []);

    return (
        <AuthContext.Provider value={{ session, signUpUser, signOutUser, signInUser, changeUserPassword }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}