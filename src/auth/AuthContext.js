import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../api/supabase";


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);

    const signUpUser = async (email, password, name, surnames, username) => {

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            console.log('Error in signUpUser during signup:', error);
            return { success: false, error: error };
        }

        if (data?.user?.id) {
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            if (sessionError || !sessionData?.session) {
                console.log('User not authenticated after signup:', sessionError);
                return { success: false, error: 'User not authenticated. Check email confirmation settings.' };
            }

            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .insert([
                    {
                        id: data.user.id,
                        name: name,
                        surnames: surnames,
                        username: username,
                        games_played: 0,
                        n_successes: 0,
                        n_failures: 0,
                        total_number_questions: 0,
                        ratio: 0
                    }
                ]);

            if (profileError) {
                console.log('Error in signUpUser during profile insert:', profileError);
                return { success: false, error: profileError };
            }
            return { success: true, data: { user: data.user, profile: profileData } };
        } else {
            console.log('Signup successful, but user not available yet (check email confirmation).');
            return { success: true, data: data, message: 'Check your email to confirm and complete signup.' };
        }
    };

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

    const changeNameUser = async (nameUser) => {

        if (!nameUser || typeof nameUser !== 'string' || nameUser.trim() === '') {
            console.log('Invalid name provided');
            return { success: false, error: 'Name must be a non-empty string' };
        }

        else {
            const { error: profileError } = await supabase
                .from('profiles')
                .update({ name: nameUser.trim() })
                .eq('id', session?.user.id);

            if (profileError) {
                console.log('Error updating profile:', profileError);
                return { success: false, error: profileError };
            }

            else {
                return { success: true };
            }
        }
    };

    const changeSurnamesUser = async (surnamesUser) => {
        if (!surnamesUser || typeof surnamesUser !== 'string' || surnamesUser.trim() === '') {
            console.log('Invalid name provided');
            return { success: false, error: 'Name must be a non-empty string' };
        }

        else {
            const { error: profileError } = await supabase
                .from('profiles')
                .update({ surnames: surnamesUser.trim() })
                .eq('id', session?.user.id);

            if (profileError) {
                console.log('Error updating profile:', profileError);
                return { success: false, error: profileError };
            }

            else {
                return { success: true };
            }
        }
    }
    const changeUsernameUser = async (usernameUser) => {
        if (!usernameUser || typeof usernameUser !== 'string' || usernameUser.trim() === '') {
            console.log('Invalid name provided');
            return { success: false, error: 'Name must be a non-empty string' };
        }

        else {
            const { error: profileError } = await supabase
                .from('profiles')
                .update({ username: usernameUser.trim() })
                .eq('id', session?.user.id);

            if (profileError) {
                console.log('Error updating profile:', profileError);
                return { success: false, error: profileError };
            }

            else {
                return { success: true };
            }
        }
    }

    const getUserData = async () => {
        const { data, error } = await supabase.from('profiles').select('*').eq('id', session.user.id);
        if (error) {
            console.error('Error fetching data in AuthContext:', error);
            return null;
        }
        return data;
    }

    const updateUserStats = async (successesParam, failuresParam, total_questionsParam, ratioParam, games_playedParam) => {
        const { profileError } = await supabase
                .from('profiles')
                .update({ 
                    n_successes: successesParam,
                    n_failures: failuresParam,
                    total_number_questions: total_questionsParam,
                    ratio: ratioParam,
                    games_played: games_playedParam
                })
                .eq('id', session?.user.id);

            if (profileError) {
                console.error('Error updating data in AuthContext:', profileError);
                return { success: false, error: profileError };
            }

            else {
                return { success: true };
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
        <AuthContext.Provider value={{ session, signUpUser, signOutUser, signInUser, changeUserPassword, changeNameUser, changeSurnamesUser, changeUsernameUser, getUserData, updateUserStats }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}