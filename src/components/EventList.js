import Event from "./Event";

const EventList = ({ events = [] }) => {
    return (
        <ul id="event-list">
            {events
                ? events.map((event) => (
                      <div id="event-details" key={event.id}>
                          <Event event={event} />
                      </div>
                  ))
                : null}
        </ul>
    );
};

export default EventList;
