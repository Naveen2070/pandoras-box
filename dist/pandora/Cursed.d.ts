/// <reference types="node" />
/**
 * Encrypts the given data using AES-256-CBC encryption with time-based and cursed options.
 *
 * @param {string} data - The data to be encrypted.
 * @param {Buffer} key - The encryption key.
 * @param {string} unlockDateTimeStr - The date and time at which the data will be unlocked.
 * @param {Buffer} [iv1] - The initialization vector (optional). If not provided, a random IV will be generated.
 * @param {boolean} [curse] - Whether to add the 'cursed' keyword to the encrypted data (optional).
 * @returns {string} The encrypted data, including the IVs and the double-encrypted data.
 */
export declare function whisper(data: string, key: Buffer, unlockDateTimeStr: string, iv1?: Buffer, curse?: boolean): string;
/**
 * Function to decrypt data using AES-256-CBC with time-based and cursed options.
 *
 * @param {string} encryptedData - The encrypted data to be decrypted.
 * @param {Buffer} key - The key used for decryption.
 * @returns The decrypted data.
 * @throws {Error} If the current time is before the unlock time or if the data is cursed.
 */
export declare function peek(encryptedData: string, key: Buffer): string;
declare const Cursed: {
    whisper: typeof whisper;
    peek: typeof peek;
};
export default Cursed;
