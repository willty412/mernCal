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