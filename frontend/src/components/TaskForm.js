import React, { useState } from 'react'
import { useTasksContext } from '../hooks/useTasksContext';

const TaskForm = ({date}) => {
    const { dispatch } = useTasksContext()
    const [title, setTitle] = useState('')    
    const [description, setDescription] = useState('')
    const [comepleted, setComepleted] = useState(true)
    const [startDate, setStartDate] = useState(date)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const task = { title, description, comepleted, startDate }

        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }
        if(response.ok){
            setTitle('')
            setDescription('')
            setComepleted(true)
            setStartDate('')
            setError(null)
            console.log('Task added successfully', json)
            dispatch({type: 'CREATE_TASK', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Task</h3>
            <label>Task title:</label>
            <input
                type = "text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
             />

            <label>Task Description:</label>
            <input
                type = "text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
             />

             <button>Submit Task</button>
        </form>
    )


}

export default TaskForm