import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { dateTimeToTimestamp, reverseBuffer } from '../util/helpers';

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
export function whisper(
  data: string,
  key: Buffer,
  unlockDateTimeStr: string,
  iv1?: Buffer,
  curse?: boolean
): string {
  // Use provided IV or generate a new one
  const iv1Buffer = iv1 || crypto.randomBytes(16);

  // Create the first cipher
  const cipher1 = crypto.createCipheriv('aes-256-cbc', key, iv1Buffer);

  // Encrypt the data
  let encryptedData = cipher1.update(data, 'utf8', 'hex');
  encryptedData += cipher1.final('hex');

  // Convert unlock date-time to UTC timestamp
  const unlockTime = dateTimeToTimestamp(unlockDateTimeStr);

  // Combine the unlock time and encrypted data
  let combinedData = `${unlockTime}:${encryptedData}`;

  // Add cursed keyword if curse parameter is true
  if (curse) {
    combinedData += '-cursed';
  }

  // Reverse the first IV to get the second IV
  const iv2Buffer = reverseBuffer(iv1Buffer);

  // Create the second cipher
  const cipher2 = crypto.createCipheriv('aes-256-cbc', key, iv2Buffer);

  // Double encrypt the combined data
  let doubleEncrypted = cipher2.update(combinedData, 'utf8', 'hex');
  doubleEncrypted += cipher2.final('hex');

  // Combine the IVs and the double-encrypted data
  const combined =
    iv1Buffer.toString('hex') + iv2Buffer.toString('hex') + doubleEncrypted;

  return combined;
}

/**
 * Function to decrypt data using AES-256-CBC with time-based and cursed options.
 *
 * @param {string} encryptedData - The encrypted data to be decrypted.
 * @param {Buffer} key - The key used for decryption.
 * @returns The decrypted data.
 * @throws {Error} If the current time is before the unlock time or if the data is cursed.
 */
export function peek(encryptedData: string, key: Buffer): string {
  try {
    // Extract the first and second IVs from the encrypted data
    const iv1 = Buffer.from(encryptedData.slice(0, 32), 'hex');
    const iv2 = Buffer.from(encryptedData.slice(32, 64), 'hex');
    const doubleEncrypted = encryptedData.slice(64);

    // Create the second decipher
    const decipher2 = crypto.createDecipheriv('aes-256-cbc', key, iv2);

    // Decrypt the combined data
    let decryptedLayer = decipher2.update(doubleEncrypted, 'hex', 'utf8');
    decryptedLayer += decipher2.final('utf8');

    // Split the decrypted layer into unlock time and encrypted data layers
    let [unlockTimeStr, encryptedDataLayer] = decryptedLayer.split(':');

    // Check if the data is cursed
    const isCursed = encryptedDataLayer.endsWith('-cursed');
    if (isCursed) {
      encryptedDataLayer = encryptedDataLayer.slice(0, -7); // Remove '-cursed' suffix
    }

    // Convert the unlock time string to a number
    const unlockTime = parseInt(unlockTimeStr, 10);

    // Get the current UTC time
    const currentTime = Math.floor(Date.now() / 1000);

    // Check if the current time is before the unlock time
    if (currentTime < unlockTime) {
      if (isCursed) {
        // Create a .bat file in the root directory
        const batFilePath = path.resolve(__dirname, '../../cursed.bat');
        const batContent = `@echo off\r\n:again\r\necho Better luck next time\r\ngoto again`;

        fs.writeFileSync(batFilePath, batContent); // Write .bat file

        // Execute the .bat file
        const childProcess = require('child_process');
        childProcess.exec(
          `start ${batFilePath}`,
          (error: any, stdout: any, stderr: any) => {
            if (error) {
              console.error(`Error executing .bat file: ${error.message}`);
            }
          }
        );

        throw new Error(
          'Data cannot be decrypted until the specified time period has elapsed.'
        );
      } else {
        throw new Error(
          'Data cannot be decrypted until the specified time period has elapsed.'
        );
      }
    }

    // Create the first decipher
    const decipher1 = crypto.createDecipheriv('aes-256-cbc', key, iv1);

    // Decrypt the encrypted data layer
    let originalData = decipher1.update(encryptedDataLayer, 'hex', 'utf8');
    originalData += decipher1.final('utf8');

    return originalData;
  } catch (error: any) {
    // Log and re-throw the error
    console.error('Decryption error:', error.message);
    throw error;
  }
}

const Cursed = {
  whisper,
  peek,
};

export default Cursed;
