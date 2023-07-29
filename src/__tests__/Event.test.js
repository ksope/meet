import Event from "../components/Event";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";

const event = {
    kind: "calendar#event",
    etag: '"3181161784712000"',
    id: "4eahs9ghkhrvkld72hogu9ph3e_20200519T140000Z",
    status: "confirmed",
    htmlLink:
        "https://www.google.com/calendar/event?eid=NGVhaHM5Z2hraHJ2a2xkNzJob2d1OXBoM2VfMjAyMDA1MTlUMTQwMDAwWiBmdWxsc3RhY2t3ZWJkZXZAY2FyZWVyZm91bmRyeS5jb20",
    created: "2020-05-19T19:17:46.000Z",
    updated: "2020-05-27T12:01:32.356Z",
    summary: "Learn JavaScript",
    description:
        "Have you wondered how you can ask Google to show you the list of the top ten must-see places in London? And how Google presents you the list? How can you submit the details of an application? Well, JavaScript is doing these. :) \n\nJavascript offers interactivity to a dull, static website. Come, learn JavaScript with us and make those beautiful websites.",
    location: "London, UK",
    creator: {
        email: "fullstackwebdev@careerfoundry.com",
        self: true,
    },
    organizer: {
        email: "fullstackwebdev@careerfoundry.com",
        self: true,
    },
    start: {
        dateTime: "2020-05-19T16:00:00+02:00",
        timeZone: "Europe/Berlin",
    },
    end: {
        dateTime: "2020-05-19T17:00:00+02:00",
        timeZone: "Europe/Berlin",
    },
    recurringEventId: "4eahs9ghkhrvkld72hogu9ph3e",
    originalStartTime: {
        dateTime: "2020-05-19T16:00:00+02:00",
        timeZone: "Europe/Berlin",
    },
    iCalUID: "4eahs9ghkhrvkld72hogu9ph3e@google.com",
    sequence: 0,
    reminders: {
        useDefault: true,
    },
    eventType: "default",
};

describe("<Event /> component", () => {
    let EventComponent;

    beforeEach(() => {
        EventComponent = render(<Event event={event} />);
    });

    test("renders event location", () => {
        expect(EventComponent.queryByText(event.location)).toBeInTheDocument();
    });

    test("renders event start time", () => {
        expect(EventComponent.queryByText(event.created)).toBeInTheDocument();
    });

    test("renders event details button with the title (show details)", () => {
        const eventButton = EventComponent.queryByRole("button");
        expect(eventButton).toBeInTheDocument();
        expect(eventButton).toHaveClass("details-btn");
    });

    test("renders title", () => {
        expect(EventComponent.queryByText(event.summary)).toBeInTheDocument();
    });

    test("by default, event's details section should be hidden", () => {
        expect(
            EventComponent.queryByText(event.description)
        ).not.toBeInTheDocument();
    });

    test("shows the details section when the user clicks on the 'Show Details' button", async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        EventComponent.rerender(<Event event={allEvents[0]} />);
        const showBtn = EventComponent.queryByRole("button");
        await user.click(showBtn);
        expect(
            EventComponent.queryByText(event.description)
        ).toBeInTheDocument();
    });

    test("hides the details section when the user clicks on the 'Hide Details' button", async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        EventComponent.rerender(<Event event={allEvents[0]} />);
        await user.click(EventComponent.getByRole("button"));
        expect(
            EventComponent.getByRole("button", { name: "Hide Details" })
        ).toBeInTheDocument();
    });
});
