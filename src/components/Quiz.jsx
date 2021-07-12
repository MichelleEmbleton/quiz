import React, { useState, useEffect } from 'react';
import AnswerButtons from './AnswerButtons';
import NavButtons from './NavButtons';
import ScoreBoard from './ScoreBoard';
import { formatStr } from '../utils/formatStr';
import './quiz.scss';

const Quiz = ({ topic, data, init }) => {

   


    const [entries, setEntries] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [count, setCount] = useState(0);
    const [view, setView] = useState('quizView');




    useEffect(() => {
        const formattedData = data.map(el => {
            return { ...el, question: formatStr(el.question) }
        });
        setEntries(formattedData);
    }, [data]);




    const onAnswer = e => {
        const { innerText } = e.target;
        const { question, answer } = entries[count];
        const userEntry = {
            question,
            answer,
            correct: answer === innerText ? true : false,
            userAnswer: innerText
        };
        const updateUserAnswers = userAnswers.filter(el => el.question !== question);
        setUserAnswers([...updateUserAnswers, userEntry]);

        if (count === entries.length - 1) {
            setView('scoreView');
            setCount(0);
        } else {
            setCount(count => count + 1);
        }
    };


 
    
    const onPageNav = sign => {
        sign === '-'
        ? setCount(count => count > 0 ? count - 1 : 0)
        : setCount(count => count === 9 ? count : count + 1)
    };
    
    



    const returnToQuiz = () => {
        setView('quizView');
        setUserAnswers([]);
    };





    const returnToCategories = () => {
        setUserAnswers([]);
        init();
    };




    // TEST
    console.log('entries: ', entries);
    console.log('user-answers: ', userAnswers);





    return (
        entries.length < 1
            ?
            <div className="loading" />
            :
            <div className="quiz-container">
                {
                    view === 'quizView'
                        ?
                        <>
                            <h2> Your category is <span> {topic} </span></h2>
                            <div className="question">
                                {entries[count].question}
                            </div>
                            <div className="answers">
                                <AnswerButtons entry={entries[count]} onSubmit={onAnswer} />
                            </div>
                            <NavButtons onChange={onPageNav} onReturn={returnToCategories} />
                        </>
                        :
                        <>
                            <ScoreBoard userAnswers={userAnswers} />
                            <button className="back-btn" onClick={returnToQuiz}>
                                Return to Quiz
                            </button>
                        </>
                }
            </div>
    )
};

export default Quiz;


