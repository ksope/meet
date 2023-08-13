import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
    const [eventNumbers, setEventNumbers] = useState(32);

    const handleInputChanged = (event) => {
        //set the value of what user types into textbox
        const value = event.target.value;
        setEventNumbers(value);

        let errorText;
        if (isNaN(value) || value <= 0) {
            errorText = "Only positive numbers are allowed";
        } else {
            setCurrentNOE(value);

            errorText = "";
        }
        setErrorAlert(errorText);
    };

    return (
        <div id="num-of-events">
            <input
                type="text"
                className="events-numbers"
                placeholder="Enter Number of Events"
                value={eventNumbers}
                onChange={handleInputChanged}
            />
        </div>
    );
};

export default NumberOfEvents;
