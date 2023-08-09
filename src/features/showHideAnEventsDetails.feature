Feature: Show/Hide Event Details
 Scenario: User can expand an event to see its details
  Given the list of events has been loaded
  When user clicks on “Show details” button for an event
  Then the event element will be expanded to show the event details

 Scenario: User can hide an event so that user can see less information about the event
  Given the selected event has been expanded
  When user clicks on “Hide details” button for an event
  Then the event details will be collapsed to hide the event details and show only the event element
 