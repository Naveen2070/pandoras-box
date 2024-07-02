import * as crypto from 'crypto';
import { createAnagram } from './anagram';

export function encrypt(data: string, key: Buffer, iv?: Buffer): string {
  const ivBuffer = iv || crypto.randomBytes(16); // Use provided IV or generate a new one
  const cipher = crypto.createCipheriv('aes-256-cbc', key, ivBuffer);

  let encryptedData = cipher.update(data, 'utf8', 'hex');
  encryptedData += cipher.final('hex');

  // Convert encrypted data to an anagram with meaningful words
  const anagram = createAnagram(encryptedData);

  // Combine IV and anagram
  const combined = ivBuffer.toString('hex') + anagram;

  return combined;
}

export function decrypt(encryptedData: string, key: Buffer): string {
  const iv = Buffer.from(encryptedData.slice(0, 32), 'hex'); // Extract IV
  const anagram = encryptedData.slice(32); // Extract anagram

  // Reverse the anagram to get the original encrypted data
  const encrypted = createAnagram(anagram); // Re-use the createAnagram function for simplicity

  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  let decryptedData = decipher.update(encrypted, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');

  return decryptedData;
}

const Cassandra = {
  encrypt,
  decrypt,
};

export default Cassandra;
