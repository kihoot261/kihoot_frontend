import { supabase } from "./supabase";
import React, { useState, useEffect } from 'react'

export const useConfigureGame = (kyuParam, questionsParam, orderParam) => {

    const [kihoot, setKihoot] = useState([]);
    const [quiz, setQuiz] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from('db_kihoot').select('*').in('kyu', kyuParam);
            if (error) console.error('Error fetching data:', error);
            else setKihoot(data);
        };
        fetchData();
    }, [kyuParam]);

    useEffect(() => {
        if (kihoot.length > 0 && questionsParam !== null) {
            createQuiz();
        }
    }, [kihoot, questionsParam, orderParam]);

    function generateUniqueRandom(count, min, max, correctId) {
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

    function generateAnswers(correctId) {
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
            return error
        }
    }

    function randomLimited() {
        let questions = [];
        try {
            const randomIds = generateUniqueRandom(questionsParam, 1, kihoot.length - 1, -1);
            randomIds.forEach((id) => {
                let question = {};
                let elem = kihoot.find(tecnique => tecnique.id === id);
                question['question'] = elem.image;
                question['correctAnswer'] = elem.name;
                const answers = generateAnswers(id);
                question['answers'] = answers;
                questions.push(question);
            });
        }

        catch (error) {
            console.error('Error in randomLimited:', error);
            return error;
        }

        return questions;

    }

    function createQuiz() {
        try {
            const finalQuiz = randomLimited();
            setQuiz(finalQuiz);
        }
        catch (error) {
            console.error('Error in createQuiz:', error);
            setQuiz([]);
        }
    }

    return { questions: quiz }
}

