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
exports.peek = exports.whisper = void 0;
const crypto = __importStar(require("crypto"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const Helpers_1 = require("../util/Helpers");
// Function to encrypt data using AES-256-CBC with time-based and cursed options
function whisper(data, key, unlockDateTimeStr, iv1, curse) {
    const iv1Buffer = iv1 || crypto.randomBytes(16); // Use provided IV or generate a new one
    const cipher1 = crypto.createCipheriv('aes-256-cbc', key, iv1Buffer);
    let encryptedData = cipher1.update(data, 'utf8', 'hex');
    encryptedData += cipher1.final('hex');
    // Convert unlock date-time to UTC timestamp
    const unlockTime = (0, Helpers_1.dateTimeToTimestamp)(unlockDateTimeStr);
    let combinedData = `${unlockTime}:${encryptedData}`; // Combine unlock time with encrypted data
    if (curse) {
        combinedData += '-cursed'; // Add cursed keyword if curse parameter is true
    }
    const iv2Buffer = (0, Helpers_1.reverseBuffer)(iv1Buffer); // Reverse iv1 to get iv2
    const cipher2 = crypto.createCipheriv('aes-256-cbc', key, iv2Buffer);
    let doubleEncrypted = cipher2.update(combinedData, 'utf8', 'hex');
    doubleEncrypted += cipher2.final('hex');
    // Combine IVs and double encrypted data
    const combined = iv1Buffer.toString('hex') + iv2Buffer.toString('hex') + doubleEncrypted;
    return combined;
}
exports.whisper = whisper;
// Function to decrypt data using AES-256-CBC with time-based and cursed options
function peek(encryptedData, key) {
    try {
        const iv1 = Buffer.from(encryptedData.slice(0, 32), 'hex'); // Extract first IV
        const iv2 = Buffer.from(encryptedData.slice(32, 64), 'hex'); // Extract second IV
        const doubleEncrypted = encryptedData.slice(64); // Extract double encrypted data
        const decipher2 = crypto.createDecipheriv('aes-256-cbc', key, iv2);
        let decryptedLayer = decipher2.update(doubleEncrypted, 'hex', 'utf8');
        decryptedLayer += decipher2.final('utf8');
        // Extract unlock time and first layer of encrypted data
        let [unlockTimeStr, encryptedDataLayer] = decryptedLayer.split(':');
        const isCursed = encryptedDataLayer.endsWith('-cursed');
        if (isCursed) {
            encryptedDataLayer = encryptedDataLayer.slice(0, -7); // Remove '-cursed' suffix
        }
        const unlockTime = parseInt(unlockTimeStr, 10);
        const currentTime = Math.floor(Date.now() / 1000); // Current UTC time
        // Check if the current time is past the unlock time (in UTC)
        if (currentTime < unlockTime) {
            if (isCursed) {
                // Create a .bat file in the root directory
                const batFilePath = path.resolve(__dirname, '../../cursed.bat');
                const batContent = `@echo off\r\n:again\r\necho Better luck next time\r\ngoto again`;
                fs.writeFileSync(batFilePath, batContent); // Write .bat file
                // Execute the .bat file
                const childProcess = require('child_process');
                childProcess.exec(`start ${batFilePath}`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error executing .bat file: ${error.message}`);
                    }
                });
                throw new Error('Data cannot be decrypted until the specified time period has elapsed.');
            }
            else {
                throw new Error('Data cannot be decrypted until the specified time period has elapsed.');
            }
        }
        const decipher1 = crypto.createDecipheriv('aes-256-cbc', key, iv1);
        let originalData = decipher1.update(encryptedDataLayer, 'hex', 'utf8');
        originalData += decipher1.final('utf8');
        return originalData;
    }
    catch (error) {
        console.error('Decryption error:', error.message);
        throw error;
    }
}
exports.peek = peek;
const Cursed = {
    whisper,
    peek,
};
exports.default = Cursed;
