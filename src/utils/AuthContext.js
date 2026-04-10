import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../api/supabase";


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);



    //register, logout and login
    const signUpUser = async (email, password, name, surnames, username) => {

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    role: 'user'
                }
            }
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


    //update user
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
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session?.user.id);
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



    //routines
    const createRoutine = async (title, description, username, exercices) => {
        try {
            const { data: dataRoutine, error: routineError } = await supabase
                .from('trainings')
                .insert(
                    {
                        id_user: session?.user.id,
                        title: title,
                        username: username,
                        description: description
                    }
                )
                .select()
            if (routineError) {
                console.log('Error in createRoutine during routine insert:', routineError);
                return { success: false, error: routineError };
            }
            else {
                const id_training = dataRoutine[0].id;
                for (const ex of exercices) {
                    const { exsError } = await supabase
                        .from('training_exercises')
                        .insert({
                            id_training: id_training,
                            title: ex.title,
                            description: ex.description,
                            reps: ex.reps,
                            series: ex.series,
                            rest: ex.rest,
                            source: ex.source
                        })
                    if (exsError) {
                        console.log('Error in createRoutine during exercises insert:', exsError);
                        return { success: false, error: exsError };
                    }
                }
                return { success: true };
            }
        }
        catch (error) {
            console.error('Error creating routine in AuthContext:', error);
            return { success: false, error };
        }
    }

    const searchRoutines = async () => {
        try {
            const { data: routines, error: routinesError } = await supabase
                .from('trainings')
                .select('*')
            if (routinesError) {
                console.log('Error in searchRoutines during routine search:', routinesError);
                return { success: false, error: routinesError };
            }
            else {
                return { success: true, data: routines }
            }
        }
        catch (error) {
            console.error('Error searching routines in AuthContext:', error);
            return { success: false, error };
        }
    }

    const getMyRoutines = async () => {
        try {
            const { data: routines, error: routinesError } = await supabase
                .from('trainings')
                .select('*')
                .eq('id_user', session?.user.id)
            if (routinesError) {
                console.log('Error in getMyRoutines during routine search in AuthContext:', routinesError);
                return { success: false, error: routinesError };
            }
            else {
                return { success: true, data: routines }
            }
        }
        catch (error) {
            console.error('Error getMyRoutines in AuthContext:', error);
            return { success: false, error };
        }
    }

    const getSavedRoutines = async () => {
        try {
            const { data: routines, error: routinesError } = await supabase
                .from('saved_trainings')
                .select('*')
                .eq('id_user', session?.user.id)
            if (routinesError) {
                console.log('Error in getSavedRoutines during routine search in AuthContext:', routinesError);
                return { success: false, error: routinesError };
            }
            else {
                let array_ids = [];
                for (const r of routines) {
                    array_ids.push(r.id_training)
                }
                const { data, error } = await supabase
                    .from('trainings')
                    .select('*')
                    .in('id', array_ids);
                if (error) {
                    console.error('Error fetching saved routines in AuthContext:', error);
                    return null;
                }
                return { success: true, data: data }
            }
        }
        catch (error) {
            console.error('Error getMyRoutines in AuthContext:', error);
            return { success: false, error };
        }
    }

    const getRoutinesById = async (array_ids) => {
        try {
            if (!array_ids || array_ids.length === 0) {
                return { success: false, error: 'wrong or empty array_ids' };
            }
            else {
                const { data, error } = await supabase
                    .from('trainings')
                    .select('*')
                    .in('id', array_ids);
                if (error) {
                    console.error('Error fetching array_trainings in AuthContext:', error);
                    return null;
                }
                return data;
            }
        }
        catch (error) {
            console.error('Error getMyRoutines in AuthContext:', error);
            return { success: false, error };
        }
    }

    const saveRoutine = async (id_routine) => {
        try {
            const { error: routineError } = await supabase
                .from('saved_trainings')
                .insert(
                    {
                        id_user: session?.user.id,
                        id_training: id_routine
                    }
                )
                .select()
            if (routineError) {
                console.log('Error in saveRoutine during routine save:', routineError);
                return { success: false, error: routineError };
            }
            else {
                return { success: true };
            }
        }

        catch (error) {
            console.error('Error saving routine in AuthContext:', error);
            return { success: false, error };
        }
    }

    const unsaveRoutine = async (id_routine) => {
        try {
            const { error: routineError } = await supabase
                .from('saved_trainings')
                .delete()
                .eq('id_training', id_routine)
                .eq('id_user', session?.user.id)
            if (routineError) {
                console.log('Error in unsaveRoutine during routine unfavourite:', routineError);
                return { success: false, error: routineError };
            }
            else {
                return { success: true };
            }
        }

        catch (error) {
            console.error('Error saving routine in AuthContext:', error);
            return { success: false, error };
        }
    }

    const deleteRoutine = async (id_routine) => {
        try {
            const { error: routineError } = await supabase
                .from('trainings')
                .delete()
                .eq('id', id_routine)
            if (routineError) {
                console.log('Error in delete during routine deletion:', routineError);
                return { success: false, error: routineError };
            }
            else {
                return { success: true };
            }
        }

        catch (error) {
            console.error('Error deleting routine in AuthContext:', error);
            return { success: false, error };
        }
    }

    const getRoutineById = async (id_routine) => {
        try {
            const { data: routine, error: routinesError } = await supabase
                .from('trainings')
                .select('*')
                .eq('id', id_routine)
            if (routinesError) {
                console.log('Error in getRoutineById during routine search in AuthContext:', routinesError);
                return { success: false, error: routinesError };
            }
            else {
                return { success: true, data: routine }
            }
        }
        catch (error) {
            console.error('Error getRoutineById in AuthContext:', error);
            return { success: false, error };
        }
    }

    const changeRoutineTitle = async (title_routine, id_routine) => {
        const { error: routineError } = await supabase
            .from('trainings')
            .update({ title: title_routine.trim() })
            .eq('id', id_routine);

        if (routineError) {
            console.log('Error updating title routine:', routineError);
            return { success: false, error: routineError };
        }

        else {
            return { success: true };
        }
    }

    const changeRoutineDescription = async (desc_routine, id_routine) => {
        const { error: routineError } = await supabase
            .from('trainings')
            .update({ description: desc_routine.trim() })
            .eq('id', id_routine);

        if (routineError) {
            console.log('Error updating title routine:', routineError);
            return { success: false, error: routineError };
        }

        else {
            return { success: true };
        }
    }



    //exercises
    const getExercicesFromRoutineById = async (id_routine) => {
        try {
            const { data: exercices, error: exercicesError } = await supabase
                .from('training_exercises')
                .select('*')
                .eq('id_training', id_routine)
            if (exercicesError) {
                console.log('Error in getExercicesFromRoutineById during routine search in AuthContext:', exercicesError);
                return { success: false, error: exercicesError };
            }
            else {
                return { success: true, data: exercices }
            }
        }
        catch (error) {
            console.error('Error getExercicesFromRoutineById in AuthContext:', error);
            return { success: false, error };
        }
    }

    const changeExerciseName = async (name_exercise, id_exercice) => {
        const { error: exerciceError } = await supabase
            .from('training_exercises')
            .update({ title: name_exercise.trim() })
            .eq('id', id_exercice);

        if (exerciceError) {
            console.log('Error updating title exercice:', exerciceError);
            return { success: false, error: exerciceError };
        }

        else {
            return { success: true };
        }
    }

    const changeExerciseDescription = async (desc_exercise, id_exercice) => {
        const { error: exerciceError } = await supabase
            .from('training_exercises')
            .update({ description: desc_exercise.trim() })
            .eq('id', id_exercice);

        if (exerciceError) {
            console.log('Error updating description exercice:', exerciceError);
            return { success: false, error: exerciceError };
        }

        else {
            return { success: true };
        }
    }

    const changeExerciseReps = async (reps_exercise, id_exercice) => {
        const { error: exerciceError } = await supabase
            .from('training_exercises')
            .update({ reps: parseInt(reps_exercise) })
            .eq('id', id_exercice);

        if (exerciceError) {
            console.log('Error updating reps exercice:', exerciceError);
            return { success: false, error: exerciceError };
        }

        else {
            return { success: true };
        }
    }

    const changeExerciseSeries = async (series_exercise, id_exercice) => {
        const { error: exerciceError } = await supabase
            .from('training_exercises')
            .update({ series: parseInt(series_exercise) })
            .eq('id', id_exercice);

        if (exerciceError) {
            console.log('Error updating series exercice:', exerciceError);
            return { success: false, error: exerciceError };
        }

        else {
            return { success: true };
        }
    }

    const changeExerciseRest = async (rest_exercise, id_exercice) => {
        const { error: exerciceError } = await supabase
            .from('training_exercises')
            .update({ rest: parseInt(rest_exercise) })
            .eq('id', id_exercice);

        if (exerciceError) {
            console.log('Error updating rest exercice:', exerciceError);
            return { success: false, error: exerciceError };
        }

        else {
            return { success: true };
        }
    }

    const changeExerciseSource = async (source_exercise, id_exercice) => {
        const { error: exerciceError } = await supabase
            .from('training_exercises')
            .update({ source: source_exercise })
            .eq('id', id_exercice);

        if (exerciceError) {
            console.log('Error updating video source exercice:', exerciceError);
            return { success: false, error: exerciceError };
        }

        else {
            return { success: true };
        }
    }

    const deleteExercise = async (id_exercice) => {
        try {
            const { error: exerciceError } = await supabase
                .from('training_exercises')
                .delete()
                .eq('id', id_exercice)
            if (exerciceError) {
                console.log('Error in delete during exercise deletion:', exerciceError);
                return { success: false, error: exerciceError };
            }
            else {
                return { success: true };
            }
        }

        catch (error) {
            console.error('Error deleting routine in AuthContext:', error);
            return { success: false, error };
        }
    }

    const addExercise = async (id_training, title, desc, reps, series, rest, source) => {
        const { exsError } = await supabase
            .from('training_exercises')
            .insert({
                id_training: id_training,
                title: title,
                description: desc,
                reps: reps,
                series: series,
                rest: rest,
                source: source
            })
        if (exsError) {
            console.log('Error in addExercise during exercise insert:', exsError);
            return { success: false, error: exsError };
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
        <AuthContext.Provider value={{
            session,
            signUpUser,
            signOutUser,
            signInUser,
            changeUserPassword,
            changeNameUser,
            changeSurnamesUser,
            changeUsernameUser,
            getUserData,
            updateUserStats,
            createRoutine,
            searchRoutines,
            getMyRoutines,
            getSavedRoutines,
            getRoutinesById,
            saveRoutine,
            unsaveRoutine,
            deleteRoutine,
            getRoutineById,
            changeRoutineTitle,
            changeRoutineDescription,
            getExercicesFromRoutineById,
            changeExerciseName,
            changeExerciseDescription,
            changeExerciseReps,
            changeExerciseSeries,
            changeExerciseRest,
            changeExerciseSource,
            deleteExercise,
            addExercise
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}