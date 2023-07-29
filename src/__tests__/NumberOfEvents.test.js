// src/__tests__/NumberOfEvents.test.js

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents />);
    });

    test("renders text input", () => {
        const eventsNumberTextBox =
            NumberOfEventsComponent.queryByRole("textbox");
        expect(eventsNumberTextBox).toBeInTheDocument();
        expect(eventsNumberTextBox).toHaveClass("events-numbers");
    });

    test("renders default value of the input field as 32", () => {
        const eventsNumberTextBox =
            NumberOfEventsComponent.queryByRole("textbox");
        expect(eventsNumberTextBox).toHaveValue("32");
    });

    test("renders value the value that user types into textbox", async () => {
        NumberOfEventsComponent.rerender(<NumberOfEvents />);
        const user = userEvent.setup();
        const eventsNumberTextBox =
            NumberOfEventsComponent.queryByRole("textbox");
        await user.type(eventsNumberTextBox, "10");

        expect(eventsNumberTextBox).toHaveValue("10");
    });
});
