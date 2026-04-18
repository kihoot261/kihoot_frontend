import { useEffect, useState } from "react"
import { supabase } from "./supabase";


export const useConfigureFlashcards = (genreParam) => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('flashcards')
                .select('*')
                .eq('genre', genreParam);
            if (error) console.error('Error fetching data in flashcardsData:', error);
            else setQuestions(data);
        };
        fetchData()
    }, [genreParam])

    return { flashcards: questions };
}