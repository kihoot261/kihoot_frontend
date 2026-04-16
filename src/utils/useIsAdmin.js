import { useEffect, useState } from 'react'
import { supabase } from '../api/supabase'

export function useIsAdmin() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setIsAdmin(session?.user?.user_metadata?.role === 'admin');
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
            setIsAdmin(session?.user?.user_metadata?.role === 'admin');
        })

        return () => subscription.unsubscribe();
    }, [])

    return isAdmin;
}