import * as crypto from 'crypto';
import { createAnagram, reverseAnagram } from './anagram';

/**
 * Encrypts the given data using AES-256-CBC encryption.
 *
 * @param {string} data - The data to be encrypted.
 * @param {Buffer} key - The encryption key.
 * @param {Buffer} [iv] - The initialization vector (optional). If not provided, a random IV will be generated.
 * @returns {string} The encrypted data, including the IV and the anagram.
 */
export function encrypt(data: string, key: Buffer, iv?: Buffer): string {
  // Use provided IV or generate a new one
  const ivBuffer = iv || crypto.randomBytes(16); // Generate a new random IV if not provided

  // Create the cipher
  const cipher = crypto.createCipheriv('aes-256-cbc', key, ivBuffer);

  // Encrypt the data
  let encryptedData = cipher.update(data, 'utf8', 'hex');
  encryptedData += cipher.final('hex');

  // Convert encrypted data to an anagram with meaningful words
  const anagram = createAnagram(encryptedData); // Create an anagram with the encrypted data

  // Combine IV and anagram
  const combined = ivBuffer.toString('hex') + anagram; // Combine IV and anagram

  return combined;
}

/**
 * Decrypts the given encrypted data using AES-256-CBC encryption.
 *
 * @param {string} encryptedData - The data to be decrypted.
 * @param {Buffer} key - The encryption key used for decryption.
 * @returns {string} The original data.
 */
export function decrypt(encryptedData: string, key: Buffer): string {
  // Extract IV
  const iv = Buffer.from(encryptedData.slice(0, 32), 'hex');

  // Extract anagram
  const anagram = encryptedData.slice(32);

  // Reverse the anagram to get the original encrypted data
  const encrypted = reverseAnagram(anagram);

  // Create decipher with the key and IV
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  // Decrypt the data
  let decryptedData = decipher.update(encrypted, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');

  return decryptedData;
}

const Cassandra = {
  encrypt,
  decrypt,
};

export default Cassandra;
