import * as crypto from 'crypto';
import { reverseBuffer } from '../util/Helpers';

// Function to encrypt data using AES-256-CBC without time-based or cursed options
export function bury(data: string, key: Buffer, iv1?: Buffer): string {
  const iv1Buffer = iv1 || crypto.randomBytes(16); // Use provided IV or generate a new one
  const cipher1 = crypto.createCipheriv('aes-256-cbc', key, iv1Buffer);

  let encryptedData = cipher1.update(data, 'utf8', 'hex');
  encryptedData += cipher1.final('hex');

  const iv2Buffer = reverseBuffer(iv1Buffer); // Reverse iv1 to get iv2
  const cipher2 = crypto.createCipheriv('aes-256-cbc', key, iv2Buffer);

  let doubleEncrypted = cipher2.update(encryptedData, 'utf8', 'hex');
  doubleEncrypted += cipher2.final('hex');

  // Combine IVs and double encrypted data
  const combined =
    iv1Buffer.toString('hex') + iv2Buffer.toString('hex') + doubleEncrypted;

  return combined;
}

// Function to decrypt data using AES-256-CBC without time-based or cursed options
export function dig(encryptedData: string, key: Buffer): string {
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

const Treasure = {
  bury,
  dig,
};

export default Treasure;
