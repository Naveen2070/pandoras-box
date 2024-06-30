/// <reference types="node" />
/**
 * Helper function to reverse a Buffer.
 *
 * @param {Buffer} buffer - The Buffer to be reversed.
 * @return {Buffer} The reversed Buffer.
 */
export declare function reverseBuffer(buffer: Buffer): Buffer;
/**
 * Function to convert date-time string to UTC timestamp.
 *
 * @param {string} dateTimeStr - The date-time string in the format 'DD-MM-YYYY HH:mm'.
 * @return {number} The UTC timestamp.
 */
export declare function dateTimeToTimestamp(dateTimeStr: string): number;
