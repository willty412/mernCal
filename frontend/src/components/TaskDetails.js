/*
Tyler Williams
CPS420
Spring 2023
*/

import { useTasksContext } from '../hooks/useTasksContext'

const TaskDetails = ({task}) => {
    const { dispatch } = useTasksContext()

    const handleClick = async() => {
        const res = await fetch('/api/tasks/' + task._id, {
            method: 'DELETE'
        })
        const json = await res.json()

        if(!res.ok){
            dispatch({type: 'DELETE_TASK', payload: json})
        }
    }

    return(
        <div className="task-details">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <button onClick={handleClick}>delete</button>
        </div>
    )
}

export default TaskDetails;