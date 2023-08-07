import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE }) => {
    const [eventNumbers, setEventNumbers] = useState(32);

    const handleInputChanged = (event) => {
        //set the value of what user types into textbox
        const value = event.target.value;
        setEventNumbers(value);
        setCurrentNOE(value)
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
