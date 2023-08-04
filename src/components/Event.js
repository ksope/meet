// src/components/Events.js
import { useState } from "react";

const Event = ({ event }) => {
    const [showEventDetails, setShowEventDetails] = useState(false);
    const toggleEventDetails = () => {
        setShowEventDetails(!showEventDetails);
    };
    return (
        <li>
            <div className="event">
                <h2>{event.summary}</h2>
                <div className="location">
                    <p>{event.location}</p>
                </div>
                <div className="dateTime">
                    <p>{event.created}</p>
                </div>
                {showEventDetails && (
                    <div data-testid="description" className="description">
                        {event.description}
                    </div>
                )}
                <button className="details-btn" onClick={toggleEventDetails}>
                    {showEventDetails ? "Hide Details" : "Show Details"}
                </button>
            </div>
        </li>
    );
};

export default Event;
