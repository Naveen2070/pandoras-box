import { Pandro } from './main';
import * as crypto from 'crypto';

const plaintextData = 'Hello, World!';
const encryptionKey = crypto.randomBytes(32); // 32 bytes for AES-256
const unlockDateTimeStr = '21-06-2024 15:53'; // DD-MM-YYYY-HH:mm format
const userProvidedIv = crypto.randomBytes(16); // Optional user-provided IV

const encryptedData = Pandro.whisper(
  plaintextData,
  encryptionKey,
  unlockDateTimeStr,
  userProvidedIv,
  true
);
console.log('Encrypted data:', encryptedData);

// Simulate waiting and then attempting to decrypt
setTimeout(() => {
  try {
    const decryptedData = Pandro.peek(encryptedData, encryptionKey);
    console.log('Decrypted data:', decryptedData);
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}); // Wait for 70 seconds before attempting to decrypt

// Using a different namespace
import * as Encr from './main';

const encryptedDataAlt = Encr.Pandro.whisper(
  plaintextData,
  encryptionKey,
  unlockDateTimeStr,
  userProvidedIv,
  true
);
console.log('Encrypted data (alternative namespace):', encryptedDataAlt);

setTimeout(() => {
  try {
    const decryptedDataAlt = Encr.Pandro.peek(encryptedDataAlt, encryptionKey);
    console.log('Decrypted data (alternative namespace):', decryptedDataAlt);
  } catch (error: any) {
    console.error('Error (alternative namespace):', error.message);
  }
}); // Wait for 70 seconds before attempting to decrypt
