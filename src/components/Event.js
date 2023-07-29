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
                {/* <div className="name">{event.summary}</div> */}
                <div className="location">{event.location} </div>
                <div className="dateTime">{event.start.dateTime}</div>
                {showEventDetails && (
                    <div className="description">{event.description}</div>
                )}
                <button className="details-btn" onClick={toggleEventDetails}>
                    {showEventDetails ? "Hide Details" : "Show Details"}
                </button>
            </div>
        </li>
    );
};

export default Event;
