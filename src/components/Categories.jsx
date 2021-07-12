import React, { createRef } from 'react';
import { useTopicLayout } from '../utils/contexts';
import './categories.scss';





const Categories = ({ categories, renderQuiz }) => {

    

    
    const btnRef = categories.map(() => createRef(null));
    const theme = useTopicLayout();


    // TEST
    //console.log('data: ', 'loading: ', loading, 'error: ', error, quizData);
   



    const startQuiz = topic => {
        btnRef.map((btn, i) =>
        i % 2 === 0
        ? btn.current.classList.add('slide-left')
        : btn.current.classList.add('slide-right')
        );
        renderQuiz(topic);
    };



    
    return (
        <>
            <div className={`categories ${theme.layout}`}>
                {
                    categories.map((el, i) => (       
                        <button
                            key={el}
                            ref={btnRef[i]}
                            className={`topic-btn ${theme.btn}`}
                            onClick={() => startQuiz(el, i)}
                        >
                            {el}
                        </button>                
                    ))
                }
            </div> 
        </>
    );              
};



export default Categories;

