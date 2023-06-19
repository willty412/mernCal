/*
Tyler Williams
CPS420
Spring 2023
*/

import { TasksContext } from "../context/TaskContext";
import { useContext } from "react";

export const useTasksContext = () => {
    const context = useContext(TasksContext)

    if(!context){
        throw Error('useTasksContext must be used within a TasksContextProvider')
    }

    return context
}