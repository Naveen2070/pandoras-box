"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateTimeToTimestamp = exports.reverseBuffer = void 0;
// Helper function to reverse a Buffer
function reverseBuffer(buffer) {
    return Buffer.from(buffer).reverse();
}
exports.reverseBuffer = reverseBuffer;
// Function to convert date-time string to UTC timestamp
function dateTimeToTimestamp(dateTimeStr) {
    const [datePart, timePart] = dateTimeStr.split(' ');
    const [day, month, year] = datePart.split('-').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
    // const date = new Date(Date.UTC(year, month - 1, day, hours, minutes));
    const date = new Date(year, month - 1, day, hours, minutes);
    const timestamp = Math.floor(date.getTime() / 1000);
    return timestamp;
}
exports.dateTimeToTimestamp = dateTimeToTimestamp;
