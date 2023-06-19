/*
Tyler Williams
CPS420
Spring 2023
*/

import { createContext, useReducer } from 'react';

export const TasksContext = createContext();


const tasksReducer = (state, action) => {
    switch(action.type) {
        case 'SET_TASKS':
            return {
                tasks: action.payload
            }
        case 'CREATE_TASK':
            return {
                tasks: [action.payload, ...state.tasks]
            }
        case 'DELETE_TASK':
            return {
                tasks: state.tasks.filter((t) => t._id !== action.payload._id)
            }
            default:
                return state
    }
}

export const TasksContextProvider = (props) => {

    const [state, dispatch] = useReducer(tasksReducer, { 
        tasks: null 
    })

    return (
        <TasksContext.Provider value={{...state, dispatch}}>
            {props.children}
        </TasksContext.Provider>
    )
}