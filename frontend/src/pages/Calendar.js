import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import TaskDetails from '../components/TaskDetails';
import TaskForm from '../components/TaskForm';
import { useTasksContext } from '../hooks/useTasksContext';


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Calendar = () => {
    const [date] = useState(new Date());
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());
    const [selectedDate, setSelectedDate] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    //const [tasks, setTasks] = useState(null);
    const {tasks, dispatch} = useTasksContext();

    //Fetch data from database
    useEffect(() => {
      const fetchTasks = async () => {
        const res = await fetch('/api/tasks')
        const json = await res.json()
        
        if (res.ok) {
          dispatch({type: 'SET_TASKS', payload: json})
        }
      }
      fetchTasks()
    } , [])

    function prevMonth() {
        setMonth(month <= 0 ? 11 : month -1);
        setYear(month <= 0 ? year - 1 : year);
    
      }
    
      function nextMonth() {
        setMonth(month >= 11 ? 0 : month + 1);
        setYear(month >= 11 ? year + 1 : year);
      }

      function handleDateClick(date){
        setSelectedDate(date);
        setModalIsOpen(true);
      }
    
    function buildCalendar(){
    let rows = [];
    let cells = [];
    let firstDay = new Date(year, month, 1);
    let startDay = firstDay.getDay();
    let numDays = new Date(year, month + 1, 0).getDate();
    let daysCounter = 0;
    for(let  i = 0; i < 6; i++){
      for (let j = 0; j < 7; j++){
        if(i === 0 && j < startDay){
          cells.push(<td key={j}></td>);
        }else if(daysCounter < numDays){
          daysCounter++;
          const date = new Date(year, month, daysCounter);
          const tasksForDay = tasks ? tasks.filter(task => task.startDate === date.toISOString()) : null;
          const dateUse = date.toDateString();
          cells.push(
            <td key={j} onClick = {() => handleDateClick(dateUse)}>
            {daysCounter}
            <div className="tasks">
              {tasksForDay && tasksForDay.map(task => (
                <TaskDetails key={task._id} task={task} />
              ))}
            </div>
          </td>
          );
        }
        if(j === 6){
          rows.push(<tr key={i}>{cells}</tr>);
          cells = [];
        }
      }
    }
    return rows;
    }

    return(
    <div id="calendar-Container">
        <div id="calendar-header">
            <h1 id="month-year">
                <button onClick={prevMonth}>prev</button> 
                {months[month]} {year} 
                <button onClick={nextMonth}>next</button>
            </h1> 
        </div>
        <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody id="calendar-body">{buildCalendar()}</tbody>
      </table>
      <Modal id = "modal1" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <TaskForm date={selectedDate}/>
      </Modal>
     </div>
    )
}


export default Calendar;