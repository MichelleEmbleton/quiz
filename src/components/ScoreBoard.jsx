import React, { useState, useEffect } from 'react';
import './score-board.scss';

const ScoreBoard = ({ userAnswers }) => {




    const [scores, setScores] = useState({ right: 0, wrong: 0 });

 


    useEffect(() => {
        const { right, wrong } = userAnswers.reduce((acc, cur) => {
            acc[cur.correct === true ? 'right' : 'wrong'] += 1;
            return acc;
        }, { right: 0, wrong: 0 });
        setScores({ right, wrong });
    }, [userAnswers])




    // TEST
    console.log('scores: ', scores);





    const renderEntries = correct =>
        userAnswers.map((el, i) =>
            el.correct === correct
                ?
                <div className="score-entry" key={i}>
                    <p className="score-question"> {el.question} </p>
                    {
                        !el.correct &&
                        <p className="wrong-answer"> {el.userAnswer} </p>
                    }
                    <p className="score-answer"> {el.answer} </p>
                </div>
                :
                null
        )




    return (
        <div className="scores">


            <div className="score-list correct-list">
                {
                    scores.right > 0
                        ? <div className="score-list-heading">
                            <span className="score-list-count"> {scores.right} </span>
                            {` Correct Answer${scores.right > 1 ? 's' : ''}`}
                            {renderEntries(true)}
                         </div>
                        : <div className="no-entry"> No correct answers! </div>
                }
            </div>


            <div className="score-list wrong-list">
                {
                    scores.wrong > 0
                        ? <div className="score-list-heading">
                            <span className="score-list-count"> {scores.wrong} </span>
                            {` Incorrect Answer${scores.wrong > 1 ? 's' : ''}`}
                            {renderEntries(false)}
                        </div>
                        : <div className="no-entry"> No wrong answers! </div>
                }
            </div>


        </div>
    )
};

export default ScoreBoard;

