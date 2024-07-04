/// <reference types="node" />
/**
 * Encrypts the given data using AES-256-CBC encryption.
 *
 * @param {string} data - The data to be encrypted.
 * @param {Buffer} key - The encryption key.
 * @param {Buffer} [iv] - The initialization vector (optional). If not provided, a random IV will be generated.
 * @returns {string} The encrypted data, including the IV and the anagram.
 */
export declare function encrypt(data: string, key: Buffer, iv?: Buffer): string;
/**
 * Decrypts the given encrypted data using AES-256-CBC encryption.
 *
 * @param {string} encryptedData - The data to be decrypted.
 * @param {Buffer} key - The encryption key used for decryption.
 * @returns {string} The original data.
 */
export declare function decrypt(encryptedData: string, key: Buffer): string;
declare const Cassandra: {
    encrypt: typeof encrypt;
    decrypt: typeof decrypt;
};
export default Cassandra;
//# sourceMappingURL=prophecy.d.ts.map