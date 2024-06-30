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
exports.dig = exports.bury = void 0;
const crypto = __importStar(require("crypto"));
const helpers_1 = require("../util/helpers");
/**
 * Function to encrypt data using AES-256-CBC without time-based or cursed options.
 *
 * @param {string} data - The data to be encrypted.
 * @param {Buffer} key - The encryption key.
 * @param {Buffer} [iv1] - The initialization vector (optional). If not provided, a random IV will be generated.
 * @returns {string} The encrypted data, including the IVs and the double-encrypted data.
 */
function bury(data, key, iv1) {
    // Use provided IV or generate a new one
    const iv1Buffer = iv1 || crypto.randomBytes(16);
    // Create the first cipher
    const cipher1 = crypto.createCipheriv('aes-256-cbc', key, iv1Buffer);
    // Encrypt the data
    let encryptedData = cipher1.update(data, 'utf8', 'hex');
    encryptedData += cipher1.final('hex');
    // Reverse the first IV to get the second IV
    const iv2Buffer = (0, helpers_1.reverseBuffer)(iv1Buffer);
    // Create the second cipher
    const cipher2 = crypto.createCipheriv('aes-256-cbc', key, iv2Buffer);
    // Double encrypt the encrypted data
    let doubleEncrypted = cipher2.update(encryptedData, 'utf8', 'hex');
    doubleEncrypted += cipher2.final('hex');
    // Combine the IVs and the double-encrypted data
    const combined = iv1Buffer.toString('hex') + iv2Buffer.toString('hex') + doubleEncrypted;
    return combined;
}
exports.bury = bury;
/**
 * Function to decrypt data using AES-256-CBC without time-based or cursed options.
 *
 * @param {string} encryptedData - The encrypted data to be decrypted.
 * @param {Buffer} key - The secret key used for decryption.
 * @returns {string} - The decrypted original data.
 */
function dig(encryptedData, key) {
    // Extract the second IV from the encrypted data
    const iv2 = Buffer.from(encryptedData.slice(32, 64), 'hex');
    // Extract the double-encrypted data from the encrypted data
    const doubleEncrypted = encryptedData.slice(64);
    // Create the second decipher
    const decipher2 = crypto.createDecipheriv('aes-256-cbc', key, iv2);
    // Decrypt the double-encrypted data
    let decryptedLayer = decipher2.update(doubleEncrypted, 'hex', 'utf8');
    decryptedLayer += decipher2.final('utf8');
    // Extract the first IV from the encrypted data
    const iv1 = Buffer.from(encryptedData.slice(0, 32), 'hex');
    // Create the first decipher
    const decipher1 = crypto.createDecipheriv('aes-256-cbc', key, iv1);
    // Decrypt the first layer of encrypted data
    let originalData = decipher1.update(decryptedLayer, 'hex', 'utf8');
    originalData += decipher1.final('utf8');
    return originalData;
}
exports.dig = dig;
const Treasure = {
    bury,
    dig,
};
exports.default = Treasure;
