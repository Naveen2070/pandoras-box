import * as crypto from 'crypto';

// Function to encrypt data using AES-256-CBC
function encryptData(data: string, key: Buffer, delaySeconds: number): string {
  const iv1 = crypto.randomBytes(16); // Initialization Vector for the first encryption
  const cipher1 = crypto.createCipheriv('aes-256-cbc', key, iv1);

  let encryptedData = cipher1.update(data, 'utf8', 'hex');
  encryptedData += cipher1.final('hex');

  // Get the current timestamp and add the delay to get the unlock time
  const unlockTime = Math.floor(Date.now() / 1000) + delaySeconds;
  const combinedData = `${unlockTime}:${encryptedData}`; // Combine unlock time with encrypted data

  const iv2 = crypto.randomBytes(16); // Initialization Vector for the second encryption
  const cipher2 = crypto.createCipheriv('aes-256-cbc', key, iv2);

  let doubleEncrypted = cipher2.update(combinedData, 'utf8', 'hex');
  doubleEncrypted += cipher2.final('hex');

  // Combine IVs and double encrypted data
  const combined = iv1.toString('hex') + iv2.toString('hex') + doubleEncrypted;

  return combined;
}

// Function to decrypt data using AES-256-CBC
function decryptData(encryptedData: string, key: Buffer): string {
  const iv1 = Buffer.from(encryptedData.slice(0, 32), 'hex'); // Extract first IV
  const iv2 = Buffer.from(encryptedData.slice(32, 64), 'hex'); // Extract second IV
  const doubleEncrypted = encryptedData.slice(64); // Extract double encrypted data

  const decipher2 = crypto.createDecipheriv('aes-256-cbc', key, iv2);

  let decryptedLayer = decipher2.update(doubleEncrypted, 'hex', 'utf8');
  decryptedLayer += decipher2.final('utf8');

  // Extract unlock time and first layer of encrypted data
  const [unlockTimeStr, encryptedDataLayer] = decryptedLayer.split(':');
  const unlockTime = parseInt(unlockTimeStr, 10);
  const currentTime = Math.floor(Date.now() / 1000);

  // Check if the current time is past the unlock time
  if (currentTime < unlockTime) {
    throw new Error(
      'Data cannot be decrypted until the specified time period has elapsed.'
    );
  }

  const decipher1 = crypto.createDecipheriv('aes-256-cbc', key, iv1);

  let originalData = decipher1.update(encryptedDataLayer, 'hex', 'utf8');
  originalData += decipher1.final('utf8');

  return originalData;
}

// Example usage
const plaintextData = 'Hello, World!';
const encryptionKey = crypto.randomBytes(32); // 32 bytes for AES-256
const delaySeconds = 60; // 1 minute delay

const encryptedData = encryptData(plaintextData, encryptionKey, delaySeconds);
console.log('Encrypted data:', encryptedData);

// Simulate waiting and then attempting to decrypt
setTimeout(() => {
  try {
    const decryptedData = decryptData(encryptedData, encryptionKey);
    console.log('Decrypted data:', decryptedData);
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}, 70000); // Wait for 70 seconds before attempting to decrypt
