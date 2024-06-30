/// <reference types="node" />
/**
 * Encrypts the given data using AES-256-CBC encryption with time-based condition.
 *
 * @param {string} data - The data to be encrypted.
 * @param {Buffer} key - The encryption key.
 * @param {string} unlockDateTimeStr - The date and time at which the data will be unlocked.
 * @param {Buffer} [iv1] - The initialization vector (optional). If not provided, a random IV will be generated.
 * @returns {string} The encrypted data, including the IVs and the double-encrypted data.
 */
export declare function hibernate(data: string, key: Buffer, unlockDateTimeStr: string, iv1?: Buffer): string;
/**
 * Function to decrypt data using AES-256-CBC with time-based condition.
 *
 * @param {string} encryptedData - The encrypted data to be decrypted.
 * @param {Buffer} key - The secret key used for decryption.
 * @returns {string} - The decrypted original data.
 * @throws {Error} - If the current time is before the unlock time.
 */
export declare function arise(encryptedData: string, key: Buffer): string;
declare const TimeCapsule: {
    hibernate: typeof hibernate;
    arise: typeof arise;
};
export default TimeCapsule;
