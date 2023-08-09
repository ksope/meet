import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within } from "@testing-library/react";
import App from "../App";
import { getEvents } from "../api";
import userEvent from "@testing-library/user-event";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
    test("User can expand an event to see its details", ({
        given,
        when,
        then,
    }) => {
        let AppComponent;
        let eventListItems;
        let showDetailsButton;
        let EventListDOM;
        let user;
        given("the list of events has been loaded", async () => {
            //render the App component in the screen
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            //select the <ul> event list element from the DOM
            EventListDOM = AppDOM.querySelector("#event-list");
            //get the list of events within an event list
            eventListItems = await within(EventListDOM).findAllByRole(
                "listitem"
            );
            expect(eventListItems.length).toBe(32);

            user = userEvent.setup();
            //find the button element within the first event
            showDetailsButton = await within(eventListItems[0]).findByText(
                "Show Details"
            );
        });

        when("user clicks on “Show details” button for an event", async () => {
            await user.click(showDetailsButton);
        });

        then(
            "the event element will be expanded to show the event details",
            async () => {
                //confirm the event details render in the DOM
                const showDetails = await EventListDOM.querySelector(".event");
                expect(showDetails).toBeInTheDocument();
            }
        );
    });

    test("User can hide an event so that user can see less information about the event", ({
        given,
        when,
        then,
    }) => {
        let AppComponent;
        let eventListItems;
        let showDetailsButton;
        let hideDetailsButton;
        let EventListDOM;
        let showDetails;
        let detailedEvent;

        given("the selected event has been expanded", async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            EventListDOM = AppDOM.querySelector("#event-list");

            const eventListItems = await within(EventListDOM).findAllByRole(
                "listitem"
            );
            expect(eventListItems.length).toBe(32);

            const user = userEvent.setup();
            showDetailsButton = await within(eventListItems[0]).findByText(
                "Show Details"
            );

            await user.click(showDetailsButton);

            showDetails = await EventListDOM.querySelector(".event");
            expect(showDetails).toBeInTheDocument();
        });

        when("user clicks on “Hide details” button for an event", async () => {
            //button text has changed text and function to hide the event details after it has been clicked once
            detailedEvent = EventListDOM.querySelector(".event");

            hideDetailsButton =
                within(detailedEvent).queryByText("Hide Details");

            const user = userEvent.setup();

            //user clicks on the 'Hide Details' button
            await user.click(hideDetailsButton);
        });

        then(
            "the event details will be collapsed to hide the event details and show only the event element",
            () => {
                const details =
                    within(detailedEvent).queryByTestId("description");
                expect(details).not.toBeInTheDocument();
            }
        );
    });
});
