// src/__tests__/NumberOfEvents.test.js

import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";
import App from "../App";
import EventList from "../components/EventList";
import Event from "../components/Event";
import { extractLocations, getEvents } from "../api";

describe("<NumberOfEvents /> component", () => {
    test("renders text input", () => {
        render(
            <NumberOfEvents setErrorAlert={() => {}} setCurrentNOE={() => {}} />
        );
        const eventsNumberTextBox = screen.getByRole("textbox");
        expect(eventsNumberTextBox).toBeInTheDocument();
    });

    test("renders default value of the input field as 32", () => {
        render(
            <NumberOfEvents setErrorAlert={() => {}} setCurrentNOE={() => {}} />
        );
        const eventsNumberTextBox = screen.getByRole("textbox");
        expect(eventsNumberTextBox).toHaveValue("32");
    });

    test("renders the value that user types into textbox", () => {
        render(
            <NumberOfEvents setErrorAlert={() => {}} setCurrentNOE={() => {}} />
        );
        const inputElement = screen.getByRole("textbox");
        fireEvent.change(inputElement, {
            target: { value: "{backspace}{backspace}10" },
        });
        expect(inputElement.value).toBe("{backspace}{backspace}10");
    });
});

describe("<NumberOfEvents /> integration", () => {
    test("renders suggestions list when the app is rendered.", async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const NumberOfEventsDOM = AppDOM.querySelector("#num-of-events");
        const numberTextBox = within(NumberOfEventsDOM).queryByRole("textbox");
        fireEvent.change(numberTextBox, {
            target: { value: "10" },
        });

        //filter number of displayed events on page

        const ListOfEventsDOM = AppDOM.querySelector("#event-list");

        const EventListItems = await within(ListOfEventsDOM).findAllByRole(
            "listitem"
        );
        expect(EventListItems.length).toBe(10);
    });
});
