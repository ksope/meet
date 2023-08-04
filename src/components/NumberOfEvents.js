import { useState } from "react";

const NumberOfEvents = () => {
    const [eventNumbers, setEventNumbers] = useState(32);

    const handleInputChanged = (value) => {
        const numberValue = parseInt(value); // Convert the input value to a number
        if (!isNaN(numberValue)) {
            setEventNumbers(numberValue);
        } else {
            setEventNumbers(32);
        }
    };

    return (
        <div id="num-of-events">
            <input
                type="text"
                className="events-numbers"
                placeholder="Enter Number of Events"
                value={eventNumbers}
                onChange={(e) => handleInputChanged(e.target.value)}
            />
        </div>
    );
};

export default NumberOfEvents;
