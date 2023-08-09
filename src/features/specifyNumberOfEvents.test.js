import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, fireEvent } from "@testing-library/react";
import App from "../App";
import { getEvents } from "../api";
import userEvent from "@testing-library/user-event";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
    test("When user hasn’t entered a set number of events to display, show all upcoming events from all cities", ({
        given,
        when,
        then,
    }) => {
        given("the user hasn’t searched for any city", () => {});
        let AppComponent;

        when("the user opens the app", () => {
            AppComponent = render(<App />);
        });

        then("the user should see a list of upcoming events", async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector("#event-list");

            const EventListItems = await within(EventListDOM).findAllByRole(
                "listitem"
            );
            expect(EventListItems.length).toBe(32);
        });
    });

    test("User can set number of events to display when selecting a city from the suggested list", ({
        given,
        when,
        then,
    }) => {
        let AppComponent;
        given("the main page is open", () => {
            AppComponent = render(<App />);
        });
        let AppDOM;

        when(
            "the user enters a number in the filter number of events to display text box",
            () => {
                AppComponent = render(<App />);
                AppDOM = AppComponent.container.firstChild;

                const NumberOfEventsDOM =
                    AppDOM.querySelector("#num-of-events");
                const numberTextBox =
                    within(NumberOfEventsDOM).queryByRole("textbox");
                fireEvent.change(numberTextBox, {
                    target: { value: "10" },
                });
            }
        );

        then(
            "the user should see a list of events matching the number entered and the city in the entered in the city text box",
            async () => {
                const ListOfEventsDOM = AppDOM.querySelector("#event-list");

                const EventListItems = await within(
                    ListOfEventsDOM
                ).findAllByRole("listitem");
                expect(EventListItems.length).toBe(10);
            }
        );
    });
});
