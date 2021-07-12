import React, { useState, useEffect } from 'react';
import Categories from './components/Categories';
import Quiz from './components/Quiz';
import { fetchData } from './utils/fetchData';
import './app.scss';

const App = () => {

    
    const initialState = {
        loading: false,
        error: '',
        categories: [],
        view: 'topicView',
        topic: ''
    };
    const [state, setState] = useState(initialState);
    const [questions, setQuestions] = useState([]);




    // TEST
    console.log(state.categories);
    //console.log(Array.from({length: 100}, () => ~~(Math.random() * state.categories.length - 1)));




    useEffect(() => {
        setState(state => {
            return { ...state, loading: true }
        });
        try {
            fetchData().then(data => {
                setQuestions(data);
                setState(state => {
                    return {
                        ...state,
                        categories: [...Object.keys(data), 'Surprise Me!'],
                        loading: false
                    }
                });
            });
        } catch (error) {
            setState(state => {
                return {
                    ...state,
                    loading: false,
                    error: "Data loading error 😡"
                }
            });
        }
    }, []);




    const renderQuiz = topic => {
        topic = topic === 'Surprise Me!'
            ? state.categories[~~(Math.random() * (state.categories.length - 1))]
            : topic;
        setTimeout(() => setState({ ...state, view: 'quizView', topic }), 800);
    }




    const onReturn = () => setState({ ...state, view: 'topicView' });




    return (
        <div className="app">
            {   state.loading
                ? <div className="loading" />
                : state.error
                    ? <div className="error"> {state.error} </div>
                    : state.view === 'topicView'
                        ? <Categories categories={state.categories} renderQuiz={renderQuiz} />
                        : state.view === 'quizView'
                            ? <Quiz topic={state.topic} data={questions[state.topic]} init={onReturn} />
                            : null
            }
        </div>
    )
};

export default App;


