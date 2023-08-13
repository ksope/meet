import React, { useState, useEffect } from "react";
import "./App.css";
import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents";
import { extractLocations, getEvents } from "./api";
import { InfoAlert, ErrorAlert } from "./components/Alert";

function App() {
    const [events, setEvents] = useState([]);
    const [currentNOE, setCurrentNOE] = useState(32);
    const [allLocations, setAllLocations] = useState([]);
    const [currentCity, setCurrentCity] = useState("See all cities");
    const [infoAlert, setInfoAlert] = useState("");
    const [errorAlert, setErrorAlert] = useState("");

    const fetchData = async () => {
        const allEvents = await getEvents();
        if (currentNOE >= 32) {
            const filteredEvents =
                currentCity === "See all cities"
                    ? allEvents
                    : allEvents.filter(
                          (event) => event.location === currentCity
                      );
            setEvents(filteredEvents.slice(0, currentNOE));
            setAllLocations(extractLocations(allEvents));
        } else {
            const filteredEvents = allEvents.filter(
                (event) => event.location === currentCity
            );
            setEvents(filteredEvents.slice(0, currentNOE));
            setAllLocations(extractLocations(allEvents));
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentCity, currentNOE]);

    return (
        <div className="App">
            <div className="alerts-container">
                {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
                {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
            </div>
            <CitySearch
                allLocations={allLocations}
                setCurrentCity={setCurrentCity}
                setInfoAlert={setInfoAlert}
            />
            <NumberOfEvents
                setCurrentNOE={setCurrentNOE}
                setErrorAlert={setErrorAlert}
            />
            <EventList events={events} />
        </div>
    );
}

export default App;
