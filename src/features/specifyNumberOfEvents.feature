Feature: Specify Number of Events
 Scenario: When user hasn’t entered a set number of events to display, show all upcoming events from all cities
  Given the user hasn’t searched for any city
  When the user opens the app
  Then the user should see a list of upcoming events

 Scenario: User can set number of events to display when selecting a city from the suggested list
  Given the main page is open
  When  the user enters a number in the filter number of events to display text box
  Then the user should see a list of events matching the number entered and the city in the entered in the city text box
 