import React, { useState } from 'react';
import Modal from 'react-modal';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Calendar = () => {
    const [date] = useState(new Date());
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventsDetails, setEventsDetails] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function prevMonth() {
        setMonth(month <= 0 ? 11 : month -1);
        setYear(month <= 0 ? year - 1 : year);
    
      }
    
      function nextMonth() {
        setMonth(month >= 11 ? 0 : month + 1);
        setYear(month >= 11 ? year + 1 : year);
      }

      function addEvent(date, eventDetails){
        setEventsDetails(...eventsDetails, {date, eventDetails});
      }

      function handleDateClick(date){
        setSelectedDate(date);
        setModalIsOpen(true);
      }

      // function handleEventSubmit(e){
      //   e.preventDefault();
      //   addEvent(selectedDate, eventsDetails);
      //   setSelectedDate(null);
      //   setEventsDetails("");
      //   setModalIsOpen(false);
      // }
    
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
          const date = new Date(year, month, daysCounter).toDateString();
          cells.push(
            <td key={j} onClick = {() => handleDateClick(date)}>
            {daysCounter}
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
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}/>
     </div>
    )
}


export default Calendar;