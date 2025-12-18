Google Sheets Process Automation

This project demonstrates an automated workflow designed to replace manual "copy-paste" tasks between multiple tabs in a tracking Google Sheet.

Automated Features

State-Driven Data Movement: Automatically moves an entire row from "Initial Contact" to "In Progress" or "Archived" based on a dropdown status change.

Audit Trail: Automatically appends a timestamp whenever an item moves between stages.

Real-time Dashboarding: Updates a centralized summary view (Dashboard tab) whenever data is processed.

Custom Admin UI: Adds a custom menu to the Google Sheets toolbar for manual overrides and reporting.

Setup Instructions

Create a new Google Sheet.

Create four tabs named exactly: Initial Contact, In Progress, Archived, and Dashboard.

Go to Extensions > Apps Script.

Copy the contents of Code.gs and appsscript.json into the editor.

Save the project and refresh your Google Sheet.

Set up a column in your sheets for "Status" (defaulted to Column E) with a Dropdown Data Validation containing "Accepted" and "Completed".

Technical Stack

Google Apps Script (V8 Engine)

Event-driven Triggers (onEdit)

Spreadsheet Service (SpreadsheetApp API)