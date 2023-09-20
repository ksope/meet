Project title: Meet App

Project Description: To build a serverless, progressive web application(PWA) with React using a test-driven development (TDD) technique. The application uses the Google CalendarAPI to fetch upcoming events.

More about the Meet App:
Users of this app will be able to use it either offline or online (hosted as a serverless function on the AWS cloud server) whenever they want to view upcoming events for a specific city.

Key Features of Meet App:
● Filter Events by City.
● Show/Hide Event Details.
● Specify Number of Events.
● Use the App When Offline.
● Add an App Shortcut to the Home Screen.
● Display Charts Visualizing Event Details.

The Meet app is a React App which is built using the TDD technique. The app uses the Google Calendar API and OAuth2 authentication flow to authorize users.To have such access, users must possess a token, which is generated by the authorization server usgin serverless functions and hosted on AWS Lambda.

Using BDD, the following scenarios have been written using Gherkin and test cases implemented. To access the test cases folder; starting from the root project folder, navigate  to ./src/__tests__ to view all the test files.

USER STORIES:
User Story 1: As a user,
I should be able to filter events by city  
So that I can see a list of events taking place in that city.

SCENARIO 1 (./src/__tests__/CitySearch.test.js)
When user hasn’t searched for a specific city, show upcoming events from all cities.

Given user hasn’t searched for any city;
When the user opens the app;
Then the user should see a list of upcoming events;

SCENARIO 2 (./src/__tests__/CitySearch.test.js)
User should see a list of suggestions when they search for a city.

Given the main page is open;
When user starts typing in the city textbox;
Then the user should receive a list of cities (suggestions) that match what they’ve typed;

SCENARIO 3 (./src/__tests__/CitySearch.test.js)
User can select a city from the suggested list.

Given user was typing “Berlin” in the city textbox AND the list of suggested cities is showing;
When the user selects a city (e.g., “Berlin, Germany”) from the list;
Then their city should be changed to that city (i.e., “Berlin, Germany”) AND the user should receive a list of upcoming events in that city;

User Story 2: As a user,
I should be able to show or hide event details
So that I can see a list of events taking place in that city.

SCENARIO 1 (./src/__tests__/Event.test.js)
User can expand an event to see its details

Given the list of events has been loaded;
When user clicks on “Show details” button for an event;
Then the event element will be expanded to show the event details;

SCENARIO 2 (./src/__tests__/Event.test.js)
User can hide an event so that user can see less information about the event

Given the selected event has been expanded;
When user clicks on “Hide details” button for an event;
Then the event details will be collapsed to hide the event details and show only the event element;


User Story 3: As a user,
I should be able to specify number of events
So that I can see a list of events taking place in that city.

SCENARIO 1 (./src/__tests__/EventList.test.js)
When user hasn’t entered a set number of events to display, show all upcoming events from all cities.

Given user hasn’t searched for any city;
When the user opens the app;
Then the user should see a list of upcoming events;

SCENARIO 2 (./src/__tests__/EventList.test.js)
When user hasn’t entered a set number of events to display, show all upcoming events from all cities.

Given user hasn’t searched for any city;
When user enters a number in the Number of Events text box to display number of events;
Then the user should see a list of all upcoming events matching the number entered;

SCENARIO 3 (./src/__tests__/NumberOfEvents.test.js)
User can set number of events to display when selecting a city from the suggested list

Given the main page is open and user has selected a suggested city in the city text box;
When user enters a number in the filter number of events to display text box;
Then the user should see a list of events matching the number entered and the city in the entered in the city text box;


The Architectural Diagram of the Meet App can be found here below;
![image](https://github.com/ksope/meet/assets/105855785/af51a618-3e15-407f-b43b-c471d652e940)


How to Set Up Meet App Project
Clone repository using command git clone https://github.com/ksope/meet.git 
Run the app by navigating to the meet folder and using the command: npm run start

LIVE DEMO
Test Users: Go to "https://ksope.github.io/meet/". Test users will need to request permission to be added (via their email addresses) to the authorized users list before users are allowed to use app. Added users will receive an authorization token which can be used to demo the app.

How To Run Tests:
From the project root folder, enter the command: npm run test

How To Check Test Coverage
Run the cmd: npm test -- --coverage from the project root folder

TECHNICAL: Languages, Libraries, Frameworks, etc.
● Javascript
● CSS
● HTML
● React
● Gherkin

