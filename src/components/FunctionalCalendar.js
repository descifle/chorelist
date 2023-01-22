import React, { useState } from 'react';
import ChoreHandler from './choreHandler';
import Form from './Form';
import Modal from './Modal';

const FunctionalCalendar = () => {

    const choreManager = new ChoreHandler();
    const [open, setOpen] = useState(false);
    const [day, setDay] = useState(new Date());
    const [chores, setChores] = useState(choreManager.getChores());
    const [chore, setChore] = useState();

    const days = [
        { day: "SAT", name: "Saturday" },
        { day: "SUN", name: "Sunday" },
        { day: "MON", name: "Monday" },
        { day: "TUE", name: "Tuesday" },
        { day: "WED", name: "Wednesday" },
        { day: "THU", name: "Thursday" },
        { day: "FRI", name: "Friday" }
    ]

    const onChange = (date) => setDay(date)

    const openFormModal = (value) => {
        setOpen(value)
        setChores(choreManager.getChores())
    }

    const activateDelete = (e, className, data) => {
        setActive(e, className, data)

        setChore({ record: chores[e.target.dataset.self], id: e.target.dataset.self})
    }

    const deleteChore = () => {
        choreManager.deleteChore(chore.id)
    }

    const setActive = (e, className, data) => {
        e.stopPropagation()
        // cancel bubbling
        // if(!e.target.classList.contains("day")) return
        
        if(e.target.classList.contains("active")) {
            return e.target.classList.remove("active")
        }

        const allElements = document.querySelectorAll(`.${className}`)
        allElements.forEach(ele => ele.classList.remove("active"))

        e.target.classList.add("active")
        onChange(e.target.innerText.substring(0, 3))
    }

    console.log(chore)

    return (
        <>
        { open ? <Modal handleModalClose={openFormModal} days={days} /> : "" }
            <h1 className="text-center">Choralater</h1>
            <div className="calendar">
                {days.map(({ day }, i) => {
                    return (
                        <div className="day" key={i} onClick={(e) => setActive(e, "day")}>
                            {day}
                            {chores.map((chore, i) => {
                                if (day === chore.day) return <div key={i} data-self={i.toString()} className="day-chore" onClick={e => activateDelete(e, "day-chore", i)}>{chore.chore} - {chore.user}</div>
                                else return "";
                            })}
                        </div>
                    )
                })}
            </div>
            <div className="chore-handler">
                <button className="primary-button" onClick={() => openFormModal(true)}>UPDATE</button>
                <button className="delete-button" disabled={!chore}>DELETE</button>
            </div>
            <div className="activity">
                <div className="daily">
                    <h2>Current Chores</h2>
                    <div>
                        { chores.map((chore, i) => {
                            if(day === chore.day) return <div key={i}><strong>{chore.chore}</strong>: {chore.notes}</div>
                            return null;
                        }) }
                    </div>
                </div>
                <div className="notes">
                    <h2>Notes</h2>
                    <div>
                        <div className="keet"></div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default FunctionalCalendar;