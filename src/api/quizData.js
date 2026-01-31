import { supabase } from "./supabase";
import { useState, useEffect, useCallback } from 'react'

export const useConfigureGame = (kyuParam, questionsParam, orderParam) => {

    const [kihoot, setKihoot] = useState([]);
    const [quiz, setQuiz] = useState(null);

    const generateUniqueRandom = useCallback((count, min, max, correctId) => {
        try {
            if (count > (max - min + 1)) {
                throw new Error("Cannot generate more unique numbers than the range allows");
            }
            const uniqueNumbers = new Set();
            while (uniqueNumbers.size < count) {
                const num = Math.floor(Math.random() * (max - min + 1)) + min;
                if (correctId !== num) {
                    uniqueNumbers.add(num);
                }
            }
            return Array.from(uniqueNumbers);
        }

        catch (error) {
            console.error('Error in generateUniqueRandom:', error);
            return error;
        }

    }, []);

    const generateAnswers = useCallback((correctId) => {
        try {
            let wrongAnswers = generateUniqueRandom(3, 1, kihoot.length - 1, correctId);
            const randomPos = Math.floor(Math.random() * 4);
            wrongAnswers.splice(randomPos, 0, correctId);
            let answers = [];
            wrongAnswers.forEach((id) => {
                let elem = kihoot.find(tecnique => tecnique.id === id);
                answers.push(elem.name);
            });
            return answers;
        }

        catch (error) {
            console.error('Error in generateAnswers:', error);
            return error;
        }
    }, [generateUniqueRandom, kihoot]);

    const addTechnique = useCallback((img, name, id) => {
        try {
            let question = {
                'question': img,
                'correctAnswer': name,
                'answers': generateAnswers(id)
            };
            return question;
        }
        catch (error) {
            console.error('Error in addTechnique:', error);
            return error;
        }

    }, [generateAnswers]);

    const randomLimited = useCallback(() => {
        let questions = [];
        try {
            let countQuestions = questionsParam === null ? kihoot.length - 1 : questionsParam;
            const randomIds = generateUniqueRandom(countQuestions, 1, kihoot.length - 1, -1);
            randomIds.forEach((id) => {
                let elem = kihoot.find(tecnique => tecnique.id === id);
                questions.push(addTechnique(elem.image, elem.name, id));
            });
        }

        catch (error) {
            console.error('Error in randomLimited:', error);
            return error;
        }

        return questions;

    }, [generateUniqueRandom, kihoot, questionsParam, addTechnique]);

    const sortedFull = useCallback(() => {
        let questions = [];
        try {
            kihoot.forEach((elem) => {
                questions.push(addTechnique(elem.image, elem.name, elem.id));
            });
        }

        catch (error) {
            console.error('Error in sortedFull:', error);
            return error;
        }

        return questions;

    }, [kihoot, addTechnique]);

    const createQuiz = useCallback(() => {
        try {
            if (questionsParam !== null) {
                setQuiz(randomLimited());
            }
            else {
                orderParam ? setQuiz(sortedFull()) : setQuiz(randomLimited());
            }
        }

        catch (error) {
            console.error('Error in createQuiz:', error);
            setQuiz([]);
        }
    }, [sortedFull, randomLimited, orderParam, questionsParam]);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from('db_kihoot').select('*').in('kyu', kyuParam);
            if (error) console.error('Error fetching data:', error);
            else setKihoot(data);
        };
        fetchData();
    }, [kyuParam]);

    useEffect(() => {
        if (kihoot.length > 0) {
            createQuiz();
        }

    }, [kihoot, createQuiz]);

    return { questions: quiz };
}

