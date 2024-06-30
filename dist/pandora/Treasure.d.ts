/// <reference types="node" />
/**
 * Function to encrypt data using AES-256-CBC without time-based or cursed options.
 *
 * @param {string} data - The data to be encrypted.
 * @param {Buffer} key - The encryption key.
 * @param {Buffer} [iv1] - The initialization vector (optional). If not provided, a random IV will be generated.
 * @returns {string} The encrypted data, including the IVs and the double-encrypted data.
 */
export declare function bury(data: string, key: Buffer, iv1?: Buffer): string;
/**
 * Function to decrypt data using AES-256-CBC without time-based or cursed options.
 *
 * @param {string} encryptedData - The encrypted data to be decrypted.
 * @param {Buffer} key - The secret key used for decryption.
 * @returns {string} - The decrypted original data.
 */
export declare function dig(encryptedData: string, key: Buffer): string;
declare const Treasure: {
    bury: typeof bury;
    dig: typeof dig;
};
export default Treasure;
