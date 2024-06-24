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
const main_1 = require("./main");
const crypto = __importStar(require("crypto"));
// Example 1: TimeCapsule (Time-based encryption/decryption)
const plaintextTime = 'Hello, World!';
const keyTime = crypto.randomBytes(32);
const unlockDateTimeStr = '21-06-2024 15:53'; // DD-MM-YYYY HH:mm format
const userProvidedIvTime = crypto.randomBytes(16);
const encryptedTime = main_1.TimeCapsule.hibernate(plaintextTime, keyTime, unlockDateTimeStr, userProvidedIvTime);
console.log('TimeCapsule - Encrypted data:', encryptedTime);
setTimeout(() => {
    try {
        const decryptedTime = main_1.TimeCapsule.arise(encryptedTime, keyTime);
        console.log('TimeCapsule - Decrypted data:', decryptedTime);
    }
    catch (error) {
        console.error('TimeCapsule - Error:', error.message);
    }
}, 70000); // Wait for 70 seconds before attempting to decrypt
// Example 2: Cursed (Time-based encryption with curse)
const plaintextCursed = 'Hello, World!';
const keyCursed = crypto.randomBytes(32);
const unlockDateTimeStrCursed = '21-06-2024 15:53'; // DD-MM-YYYY HH:mm format
const userProvidedIvCursed = crypto.randomBytes(16);
const encryptedCursed = main_1.Cursed.whisper(plaintextCursed, keyCursed, unlockDateTimeStrCursed, userProvidedIvCursed, true // Curse enabled
);
console.log('Cursed - Encrypted data:', encryptedCursed);
setTimeout(() => {
    try {
        const decryptedCursed = main_1.Cursed.peek(encryptedCursed, keyCursed);
        console.log('Cursed - Decrypted data:', decryptedCursed);
    }
    catch (error) {
        console.error('Cursed - Error:', error.message);
    }
}, 70000); // Wait for 70 seconds before attempting to decrypt
// Example 3: Treasure (Simple encryption/decryption)
const plaintextTreasure = 'Hello, World!';
const keyTreasure = crypto.randomBytes(32);
const encryptedTreasure = main_1.Treasure.bury(plaintextTreasure, keyTreasure);
console.log('Treasure - Encrypted data:', encryptedTreasure);
try {
    const decryptedTreasure = main_1.Treasure.dig(encryptedTreasure, keyTreasure);
    console.log('Treasure - Decrypted data:', decryptedTreasure);
}
catch (error) {
    console.error('Treasure - Error:', error.message);
}
