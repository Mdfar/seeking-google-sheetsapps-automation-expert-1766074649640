/**

Automated Workflow for Item Tracking

This script automates the movement of data between tabs based on status changes,

preventing manual copy-pasting, and updates a centralized dashboard. */

const CONFIG = { SOURCE_SHEET: "Initial Contact", PROCESSING_SHEET: "In Progress", COMPLETED_SHEET: "Archived", DASHBOARD_SHEET: "Dashboard", STATUS_COLUMN: 5, // Column E: Status ID_COLUMN: 1 // Column A: Item ID };

/**

Trigger: Runs whenever a cell is edited. */ function onEdit(e) { const range = e.range; const sheet = range.getSheet(); const sheetName = sheet.getName(); const value = e.value; const row = range.getRow();

// 1. Automate "Copy-Paste" from Initial Contact to In Progress if (sheetName === CONFIG.SOURCE_SHEET && range.getColumn() === CONFIG.STATUS_COLUMN) { if (value === "Accepted") { moveRowToSheet(sheet, row, CONFIG.PROCESSING_SHEET); updateDashboard(); } }

// 2. Automate "Copy-Paste" from In Progress to Archived if (sheetName === CONFIG.PROCESSING_SHEET && range.getColumn() === CONFIG.STATUS_COLUMN) { if (value === "Completed") { moveRowToSheet(sheet, row, CONFIG.COMPLETED_SHEET); updateDashboard(); } } }

/**

Moves a row from one sheet to another and deletes the original. */ function moveRowToSheet(sourceSheet, rowNumber, targetSheetName) { const ss = SpreadsheetApp.getActiveSpreadsheet(); const targetSheet = ss.getSheetByName(targetSheetName); const rowData = sourceSheet.getRange(rowNumber, 1, 1, sourceSheet.getLastColumn()).getValues();

// Add timestamp of transition rowData[0].push(new Date());

targetSheet.appendRow(rowData[0]); sourceSheet.deleteRow(rowNumber);

SpreadsheetApp.getActive().toast("Item moved to " + targetSheetName, "Automation Success"); }

/**

Refreshes Dashboard metrics (Total items, location counts, etc.) */ function updateDashboard() { const ss = SpreadsheetApp.getActiveSpreadsheet(); const dash = ss.getSheetByName(CONFIG.DASHBOARD_SHEET); const processing = ss.getSheetByName(CONFIG.PROCESSING_SHEET);

if (!dash) return;

const activeCount = processing.getLastRow() - 1;

// Simple view update dash.getRange("B2").setValue(activeCount > 0 ? activeCount : 0); dash.getRange("B3").setValue(new Date()); }

/**

Custom Menu to manually trigger audits or cleanups */ function onOpen() { const ui = SpreadsheetApp.getUi(); ui.createMenu('🚀 Automation Tools') .addItem('Refresh Dashboard', 'updateDashboard') .addSeparator() .addItem('Generate Status Report', 'generateReport') .addToUi(); }

function generateReport() { SpreadsheetApp.getUi().alert("Feature coming soon: Automated PDF reports via Google Docs."); }