import React, { useState } from "react";
import ChoreHandler from "./choreHandler";
import Dropdown from "./Dropdown";
// import axios from "./axios"
// import exclamation from "../assets/images/error-exclamation.png";
// import close from "../assets/images/error-close.png";

const Form = ({ handleClose, days }) => {

    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        notes: false,
        name: false,
        request: false
    });

    const choreManager = new ChoreHandler();

    const handleLoading = (bool) => setLoading(bool);

    const clearError = (fieldName) => {
        let newError = error;
        newError[fieldName] = false;

        setError({ ...newError, request: false })
    }

    const handleOutputErrorClose = () => {
        document.querySelector(".error-output").style.opacity = 0;
        setTimeout(() => {
            setError({ ...error, request: false })
        }, 400)
        document.querySelector(".error-output").style.opacity = 1;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = document.querySelector("#user").value
        const chore = document.querySelector("#chore").value
        const choreDay = document.querySelector("#chore-day").value
        console.log(user, chore, choreDay, )
        choreManager.createChore(user, chore, days.filter(day => day.name === choreDay)[0].day, `${user} completed this chore on ${new Date().toLocaleDateString()}`)
    }





    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
            <div onClick={() => handleClose()} className="modal-close flex-center">{"\u2715"}</div>
                <div className="intro">
                    Update your Chore
                </div>
                <hr />
                <div className={error.user ? "input-container error-field" : "input-container"}>
                    <Dropdown name="user" data={["Giovanni", "Natasha"]} />

                    <div className={error.user ? "error" : "error hidden"}>Hold</div>
                </div>
                <div className={error.name ? "input-container error-field" : "input-container"}>
                    <Dropdown 
                    name="chore" 
                    data={["trash", "floors", "laundry", "floors"]}
                    />
                    <div className={error.name ? "error" : "error hidden"}>Hold</div>
                </div>
                <div className={error.name ? "input-container error-field" : "input-container"}>
                    <Dropdown 
                    name="chore-day" 
                    data={days.map(obj => obj.name)}
                    />
                    <div className={error.name ? "error" : "error hidden"}>The name of company must be longer than 3 characters</div>
                </div>
                {/* <div className={error.notes ? "input-container error-field" : "input-container"}>
                    <label>Notes</label>
                    <textarea
                        id="notes"
                        onBlur={(e) => clearError("notes")}
                        required
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                    <div className={error.notes ? "error" : "error hidden"}>The note must be longer</div>
                </div> */}
                { loading ? (
                    <div className="loading-ring"><div></div><div></div><div></div><div></div></div>
                ) : (
                    <button className="main-button" type="submit">
                        SUBMIT
                    </button>
                ) }
                <div className={error.request ? "error-output" : "error-output hidden"}>
                    <img alt="important" className="exclamation" src="" />
                    There was an error processing this request
                    <img alt="close" className="close" src="" onClick={() => handleOutputErrorClose()} />
                </div>
            </form>
        </div>
    )
}

export default Form;