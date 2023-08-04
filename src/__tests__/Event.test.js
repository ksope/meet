import Event from "../components/Event";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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
    description: "Have you wondered how you can ask Google to show",
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
    test("renders event location", () => {
        render(<Event event={event} />);
        const location = screen.getByText(event.location);
        expect(location).toBeInTheDocument();
    });

    test("renders event start time", () => {
        render(<Event event={event} />);
        const startTime = screen.getByText(event.created);
        expect(startTime).toBeInTheDocument();
    });

    test("renders event details (show details) button", () => {
        render(<Event event={event} />);
        const showDetailsButton = screen.getByRole("button", {
            name: /Show Details/i,
        });
        expect(showDetailsButton).toBeInTheDocument();
    });

    test("renders title", () => {
        render(<Event event={event} />);
        const eventTitle = screen.getByText(event.summary);
        expect(eventTitle).toBeInTheDocument();
    });

    test("by default, event's details section should be hidden", () => {
        render(<Event event={event} />);
        const eventDescription = screen.queryByText(
            /Have you wondered how you can ask Google to show/i
        );
        expect(eventDescription).not.toBeInTheDocument();
    });

    test("shows the details section when the user clicks on the 'Show Details' button", async () => {
        render(<Event event={event} />);
        const user = userEvent.setup();
        const showBtn = screen.getByRole("button", {
            name: /Show Details/i,
        });
        await user.click(showBtn);
        const showDetails = await screen.findByText(
            /Have you wondered how you can ask Google to show/i
        );
        expect(showDetails).toBeInTheDocument();
    });

    test("hides the details section when the user clicks on the 'Hide Details' button", async () => {
        render(<Event event={event} />);
        const user = userEvent.setup();

        //user clicks the 'Show Details' butto to display the event description
        const btn1 = screen.getByRole("button", {
            name: /Show Details/i,
        });
        await user.click(btn1);

        //user clicks the button again. Only this time, the button displays 'Hide Details' to hide the event description
        const btn2 = screen.getByRole("button", {
            name: /Hide Details/i,
        });

        await user.click(btn2);

        expect(screen.queryByTestId("description")).not.toBeInTheDocument();
    });
});
