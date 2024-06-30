"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateTimeToTimestamp = exports.reverseBuffer = void 0;
/**
 * Helper function to reverse a Buffer.
 *
 * @param {Buffer} buffer - The Buffer to be reversed.
 * @return {Buffer} The reversed Buffer.
 */
function reverseBuffer(buffer) {
    // Create a new Buffer from the input buffer and reverse its contents.
    return Buffer.from(buffer).reverse();
}
exports.reverseBuffer = reverseBuffer;
/**
 * Function to convert date-time string to UTC timestamp.
 *
 * @param {string} dateTimeStr - The date-time string in the format 'DD-MM-YYYY HH:mm'.
 * @return {number} The UTC timestamp.
 */
function dateTimeToTimestamp(dateTimeStr) {
    // Split the date-time string into date and time parts.
    const [datePart, timePart] = dateTimeStr.split(' ');
    // Split the date part into day, month, and year parts.
    const [day, month, year] = datePart.split('-').map(Number);
    // Split the time part into hours and minutes parts.
    const [hours, minutes] = timePart.split(':').map(Number);
    // Create a new Date object using the year, month, day, hours, and minutes.
    // Note that the month is zero-based, so we subtract 1 from the month value.
    const date = new Date(year, month - 1, day, hours, minutes);
    // Convert the timestamp to seconds and round it down to the nearest second.
    const timestamp = Math.floor(date.getTime() / 1000);
    // Return the UTC timestamp.
    return timestamp;
}
exports.dateTimeToTimestamp = dateTimeToTimestamp;
