// src/__tests__/NumberOfEvents.test.js

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
    test("renders text input", () => {
        render(<NumberOfEvents />);
        const eventsNumberTextBox = screen.getByRole("textbox");
        expect(eventsNumberTextBox).toBeInTheDocument();
    });

    test("renders default value of the input field as 32", () => {
        render(<NumberOfEvents />);
        const eventsNumberTextBox = screen.getByRole("textbox");
        expect(eventsNumberTextBox).toHaveValue("32");
    });

    test("renders the value that user types into textbox", () => {
        render(<NumberOfEvents />);
        const inputElement = screen.getByRole("textbox");
        fireEvent.change(inputElement, { target: { value: "10" } });
        expect(inputElement.value).toBe("10");
    });
});
