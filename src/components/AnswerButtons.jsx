import React from 'react';
import './answer-buttons.scss';

const AnswerButtons = ({ entry, onSubmit }) => (

    <div className="btns">
        {
            Object.keys(entry)
                .sort(() => Math.random() - Math.random())
                .map((el, i) => 
                    el !== 'question' && entry[el].length > 0
                        ?   <button className="answer-btn" key={i} onClick={onSubmit}> 
                                {entry[el]} 
                            </button>
                        :   null
                )           
        }
    </div>
)

export default AnswerButtons;