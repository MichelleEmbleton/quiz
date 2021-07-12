import React, { useEffect, useReducer, useState } from 'react';
import Categories from './components/Categories';
import Quiz from './components/Quiz';
import { TopicBtnLayoutContext, topicBtnLayouts } from './utils/contexts';
import './app.scss';

const types = {
    INIT: 'INIT',
    FETCH_DATA_START: 'FETCH_DATA_START',
    FETCH_DATA_SUCCESS: 'FETCH_DATA_SUCCESS',
    FETCH_DATA_FAILURE: 'FETCH_DATA_FAILURE',
    START_QUIZ: 'START_QUIZ'
}

const initialState = { 
    categories: [],
    questions: [],
    topic: '', 
    view: 'topicView', 
    loading: false, 
    error: '',
};

const App = () => {

    // just for admin to change the topic page button layout to which is preferred
    const [topicBtnLayout, setTopicBtnLayout] = useState(topicBtnLayouts.column);


    const reducer = (state=initialState, action) => {
        const { type, payload } = action;
        switch(type){
            case types.INIT:
                return {
                    ...state,
                    view: 'topicView'
                }
            case types.FETCH_DATA_START:
                return {
                    ...state,
                    loading: true
                }
            case types.FETCH_DATA_SUCCESS:
                return {
                    ...state,
                    categories: [...Object.keys(payload), 'Surprise Me!'],
                    questions: payload,
                    loading: false
                }
            case types.FETCH_DATA_FAILURE:
                return {
                    ...state,
                    error: payload,
                    loading: false
                }
            case types.START_QUIZ:
                return {
                    ...state,
                    topic: payload === 'Surprise Me!' 
                        ? state.categories[~~(Math.random() * (state.categories.length - 1))] 
                        : payload,
                    view: 'quizView'
                }
            default: return state;
        }
    }

    const [ state, dispatch ] = useReducer(reducer, initialState);

    // TEST
    console.log(state.categories);
    //console.log(Array.from({length: 100}, () => ~~(Math.random() * state.categories.length - 1)));




    useEffect(() => {
        const fetchData = async() => {
            dispatch({ type: types.FETCH_DATA_START });
            try {
                const res = await fetch('quiz.json');
                const data = await res.json();
                dispatch({
                    type: types.FETCH_DATA_SUCCESS,
                    payload: data.questions
                })
            } catch (error) {
                dispatch({
                    type: types.FETCH_DATA_FAILURE,
                    payload: error
                })
            }
        };
        fetchData();
    }, []);




    const renderQuiz = topic => {
        setTimeout(() => dispatch({ 
            type: types.START_QUIZ,
            payload: topic
        }), 500);
    }




    const onReturn = () => dispatch({ type: types.INIT });





    const changeTopicView = () => {
        setTopicBtnLayout(topicBtnLayout => {
            return topicBtnLayout === topicBtnLayouts.column
                ? topicBtnLayouts.staggered
                : topicBtnLayouts.column
        })
    }
    




    return (
        <>
        <div className="app">
            {   state.loading
                ? <div className="loading" />
                : state.error
                ? <div className="error"> {state.error} </div>
                : state.view === 'topicView'

                ?   <>
                    <TopicBtnLayoutContext.Provider value={topicBtnLayout}>
                        <Categories categories={state.categories} renderQuiz={renderQuiz} />
                    </TopicBtnLayoutContext.Provider>
                    <div className="admin-btn-holder">
                        <button className="topic-view-btn" onClick={changeTopicView}>
                            change view
                        </button>
                    </div>
                    </>
                    
                : state.view === 'quizView'
                ? <Quiz topic={state.topic} data={state.questions[state.topic]} init={onReturn} />
                : null
            }
        </div>

        </>
    )
};

export default App;


