import * as crypto from 'crypto';
import { dateTimeToTimestamp, reverseBuffer } from '../util/helpers';

// Function to encrypt data using AES-256-CBC with time-based condition
export function hibernate(
  data: string,
  key: Buffer,
  unlockDateTimeStr: string,
  iv1?: Buffer
): string {
  const iv1Buffer = iv1 || crypto.randomBytes(16); // Use provided IV or generate a new one
  const cipher1 = crypto.createCipheriv('aes-256-cbc', key, iv1Buffer);

  let encryptedData = cipher1.update(data, 'utf8', 'hex');
  encryptedData += cipher1.final('hex');

  // Convert unlock date-time to UTC timestamp
  const unlockTime = dateTimeToTimestamp(unlockDateTimeStr);
  const combinedData = `${unlockTime}:${encryptedData}`; // Combine unlock time with encrypted data

  const iv2Buffer = reverseBuffer(iv1Buffer); // Reverse iv1 to get iv2
  const cipher2 = crypto.createCipheriv('aes-256-cbc', key, iv2Buffer);

  let doubleEncrypted = cipher2.update(combinedData, 'utf8', 'hex');
  doubleEncrypted += cipher2.final('hex');

  // Combine IVs and double encrypted data
  const combined =
    iv1Buffer.toString('hex') + iv2Buffer.toString('hex') + doubleEncrypted;

  return combined;
}

// Function to decrypt data using AES-256-CBC with time-based condition
export function arise(encryptedData: string, key: Buffer): string {
  const iv2 = Buffer.from(encryptedData.slice(32, 64), 'hex'); // Extract second IV
  const doubleEncrypted = encryptedData.slice(64); // Extract double encrypted data

  const decipher2 = crypto.createDecipheriv('aes-256-cbc', key, iv2);

  let decryptedLayer = decipher2.update(doubleEncrypted, 'hex', 'utf8');
  decryptedLayer += decipher2.final('utf8');

  // Extract unlock time and first layer of encrypted data
  const [unlockTimeStr, encryptedDataLayer] = decryptedLayer.split(':');
  const unlockTime = parseInt(unlockTimeStr, 10);
  const currentTime = Math.floor(Date.now() / 1000); // Current UTC time

  // Check if the current time is past the unlock time (in UTC)
  if (currentTime < unlockTime) {
    throw new Error(
      'Data cannot be decrypted until the specified time period has elapsed.'
    );
  }

  const iv1 = Buffer.from(encryptedData.slice(0, 32), 'hex'); // Extract first IV
  const decipher1 = crypto.createDecipheriv('aes-256-cbc', key, iv1);

  let originalData = decipher1.update(encryptedDataLayer, 'hex', 'utf8');
  originalData += decipher1.final('utf8');

  return originalData;
}

const TimeCapsule = {
  hibernate,
  arise,
};

export default TimeCapsule;
