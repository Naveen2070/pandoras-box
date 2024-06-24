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
const Helpers_1 = require("../util/Helpers");
// Function to encrypt data using AES-256-CBC without time-based or cursed options
function bury(data, key, iv1) {
    const iv1Buffer = iv1 || crypto.randomBytes(16); // Use provided IV or generate a new one
    const cipher1 = crypto.createCipheriv('aes-256-cbc', key, iv1Buffer);
    let encryptedData = cipher1.update(data, 'utf8', 'hex');
    encryptedData += cipher1.final('hex');
    const iv2Buffer = (0, Helpers_1.reverseBuffer)(iv1Buffer); // Reverse iv1 to get iv2
    const cipher2 = crypto.createCipheriv('aes-256-cbc', key, iv2Buffer);
    let doubleEncrypted = cipher2.update(encryptedData, 'utf8', 'hex');
    doubleEncrypted += cipher2.final('hex');
    // Combine IVs and double encrypted data
    const combined = iv1Buffer.toString('hex') + iv2Buffer.toString('hex') + doubleEncrypted;
    return combined;
}
exports.bury = bury;
// Function to decrypt data using AES-256-CBC without time-based or cursed options
function dig(encryptedData, key) {
    const iv2 = Buffer.from(encryptedData.slice(32, 64), 'hex'); // Extract second IV
    const doubleEncrypted = encryptedData.slice(64); // Extract double encrypted data
    const decipher2 = crypto.createDecipheriv('aes-256-cbc', key, iv2);
    let decryptedLayer = decipher2.update(doubleEncrypted, 'hex', 'utf8');
    decryptedLayer += decipher2.final('utf8');
    const iv1 = Buffer.from(encryptedData.slice(0, 32), 'hex'); // Extract first IV
    const decipher1 = crypto.createDecipheriv('aes-256-cbc', key, iv1);
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
