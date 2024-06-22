import { TimeCapsule, Cursed, Treasure } from './main';
import * as crypto from 'crypto';

// Example 1: TimeCapsule (Time-based encryption/decryption)
const plaintextTime = 'Hello, World!';
const keyTime = crypto.randomBytes(32);
const unlockDateTimeStr = '21-06-2024 15:53'; // DD-MM-YYYY HH:mm format
const userProvidedIvTime = crypto.randomBytes(16);

const encryptedTime = TimeCapsule.hibernate(
  plaintextTime,
  keyTime,
  unlockDateTimeStr,
  userProvidedIvTime
);
console.log('TimeCapsule - Encrypted data:', encryptedTime);

setTimeout(() => {
  try {
    const decryptedTime = TimeCapsule.arise(encryptedTime, keyTime);
    console.log('TimeCapsule - Decrypted data:', decryptedTime);
  } catch (error: any) {
    console.error('TimeCapsule - Error:', error.message);
  }
}, 70000); // Wait for 70 seconds before attempting to decrypt

// Example 2: Cursed (Time-based encryption with curse)
const plaintextCursed = 'Hello, World!';
const keyCursed = crypto.randomBytes(32);
const unlockDateTimeStrCursed = '21-06-2024 15:53'; // DD-MM-YYYY HH:mm format
const userProvidedIvCursed = crypto.randomBytes(16);

const encryptedCursed = Cursed.whisper(
  plaintextCursed,
  keyCursed,
  unlockDateTimeStrCursed,
  userProvidedIvCursed,
  true // Curse enabled
);
console.log('Cursed - Encrypted data:', encryptedCursed);

setTimeout(() => {
  try {
    const decryptedCursed = Cursed.peek(encryptedCursed, keyCursed);
    console.log('Cursed - Decrypted data:', decryptedCursed);
  } catch (error: any) {
    console.error('Cursed - Error:', error.message);
  }
}, 70000); // Wait for 70 seconds before attempting to decrypt

// Example 3: Treasure (Simple encryption/decryption)
const plaintextTreasure = 'Hello, World!';
const keyTreasure = crypto.randomBytes(32);

const encryptedTreasure = Treasure.bury(plaintextTreasure, keyTreasure);
console.log('Treasure - Encrypted data:', encryptedTreasure);

try {
  const decryptedTreasure = Treasure.dig(encryptedTreasure, keyTreasure);
  console.log('Treasure - Decrypted data:', decryptedTreasure);
} catch (error: any) {
  console.error('Treasure - Error:', error.message);
}
