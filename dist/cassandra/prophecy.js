"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto = __importStar(require("crypto"));
const anagram_1 = require("./anagram");
/**
 * Encrypts the given data using AES-256-CBC encryption.
 *
 * @param {string} data - The data to be encrypted.
 * @param {Buffer} key - The encryption key.
 * @param {Buffer} [iv] - The initialization vector (optional). If not provided, a random IV will be generated.
 * @returns {string} The encrypted data, including the IV and the anagram.
 */
function encrypt(data, key, iv) {
    // Use provided IV or generate a new one
    const ivBuffer = iv || crypto.randomBytes(16); // Generate a new random IV if not provided
    // Create the cipher
    const cipher = crypto.createCipheriv('aes-256-cbc', key, ivBuffer);
    // Encrypt the data
    let encryptedData = cipher.update(data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    // Convert encrypted data to an anagram with meaningful words
    const anagram = (0, anagram_1.createAnagram)(encryptedData); // Create an anagram with the encrypted data
    // Combine IV and anagram
    const combined = ivBuffer.toString('hex') + anagram; // Combine IV and anagram
    return combined;
}
exports.encrypt = encrypt;
/**
 * Decrypts the given encrypted data using AES-256-CBC encryption.
 *
 * @param {string} encryptedData - The data to be decrypted.
 * @param {Buffer} key - The encryption key used for decryption.
 * @returns {string} The original data.
 */
function decrypt(encryptedData, key) {
    // Extract IV
    const iv = Buffer.from(encryptedData.slice(0, 32), 'hex');
    // Extract anagram
    const anagram = encryptedData.slice(32);
    // Reverse the anagram to get the original encrypted data
    const encrypted = (0, anagram_1.reverseAnagram)(anagram);
    // Create decipher with the key and IV
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    // Decrypt the data
    let decryptedData = decipher.update(encrypted, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
}
exports.decrypt = decrypt;
const Cassandra = {
    encrypt,
    decrypt,
};
exports.default = Cassandra;
//# sourceMappingURL=prophecy.js.map