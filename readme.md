# pandro-bx

`pandro-bx` is a versatile encryption library for JavaScript and TypeScript that provides time-based encryption, cursed encryption, and simple encryption functionalities. It ensures secure data handling with AES-256-CBC encryption and offers features such as time-based access restrictions and custom error handling.

## Installation

You can install the package via npm:

```bash
npm install pandro-bx
```

## Usage

### JavaScript

Here's an example of how to use the `pandro-bx` package in a JavaScript project:

```javascript
const { TimeCapsule, Cursed, Treasure } = require('pandro-bx');
const crypto = require('crypto');

// TimeCapsule Example
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
  } catch (error) {
    console.error('TimeCapsule - Error:', error.message);
  }
}, 70000); // Wait for 70 seconds before attempting to decrypt

// Cursed Example
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
  } catch (error) {
    console.error('Cursed - Error:', error.message);
  }
}, 70000); // Wait for 70 seconds before attempting to decrypt

// Treasure Example
const plaintextTreasure = 'Hello, World!';
const keyTreasure = crypto.randomBytes(32);

const encryptedTreasure = Treasure.bury(plaintextTreasure, keyTreasure);
console.log('Treasure - Encrypted data:', encryptedTreasure);

try {
  const decryptedTreasure = Treasure.dig(encryptedTreasure, keyTreasure);
  console.log('Treasure - Decrypted data:', decryptedTreasure);
} catch (error) {
  console.error('Treasure - Error:', error.message);
}
```

### TypeScript

For TypeScript users, you can directly import the modules and use them with type safety:

```typescript
import { TimeCapsule, Cursed, Treasure } from 'pandro-bx';
import * as crypto from 'crypto';

// TimeCapsule Example
const plaintextTime: string = 'Hello, World!';
const keyTime: Buffer = crypto.randomBytes(32);
const unlockDateTimeStr: string = '21-06-2024 15:53'; // DD-MM-YYYY HH:mm format
const userProvidedIvTime: Buffer = crypto.randomBytes(16);

const encryptedTime: string = TimeCapsule.hibernate(
  plaintextTime,
  keyTime,
  unlockDateTimeStr,
  userProvidedIvTime
);
console.log('TimeCapsule - Encrypted data:', encryptedTime);

setTimeout(() => {
  try {
    const decryptedTime: string = TimeCapsule.arise(encryptedTime, keyTime);
    console.log('TimeCapsule - Decrypted data:', decryptedTime);
  } catch (error: any) {
    console.error('TimeCapsule - Error:', error.message);
  }
}, 70000); // Wait for 70 seconds before attempting to decrypt

// Cursed Example
const plaintextCursed: string = 'Hello, World!';
const keyCursed: Buffer = crypto.randomBytes(32);
const unlockDateTimeStrCursed: string = '21-06-2024 15:53'; // DD-MM-YYYY HH:mm format
const userProvidedIvCursed: Buffer = crypto.randomBytes(16);

const encryptedCursed: string = Cursed.whisper(
  plaintextCursed,
  keyCursed,
  unlockDateTimeStrCursed,
  userProvidedIvCursed,
  true // Curse enabled
);
console.log('Cursed - Encrypted data:', encryptedCursed);

setTimeout(() => {
  try {
    const decryptedCursed: string = Cursed.peek(encryptedCursed, keyCursed);
    console.log('Cursed - Decrypted data:', decryptedCursed);
  } catch (error: any) {
    console.error('Cursed - Error:', error.message);
  }
}, 70000); // Wait for 70 seconds before attempting to decrypt

// Treasure Example
const plaintextTreasure: string = 'Hello, World!';
const keyTreasure: Buffer = crypto.randomBytes(32);

const encryptedTreasure: string = Treasure.bury(plaintextTreasure, keyTreasure);
console.log('Treasure - Encrypted data:', encryptedTreasure);

try {
  const decryptedTreasure: string = Treasure.dig(
    encryptedTreasure,
    keyTreasure
  );
  console.log('Treasure - Decrypted data:', decryptedTreasure);
} catch (error: any) {
  console.error('Treasure - Error:', error.message);
}
```

## Modules

### TimeCapsule

Provides time-based encryption and decryption.

#### Methods

- `hibernate(data: string, key: Buffer, unlockDateTimeStr: string, iv1?: Buffer): string`

  - Encrypts data with a specified unlock date-time.
  - `data`: The plaintext data to encrypt.
  - `key`: The encryption key (32 bytes for AES-256).
  - `unlockDateTimeStr`: The unlock date-time in 'DD-MM-YYYY HH:mm' format.
  - `iv1`: Optional initialization vector (IV).

- `arise(encryptedData: string, key: Buffer): string`
  - Decrypts data if the current time is past the unlock date-time.
  - `encryptedData`: The encrypted data.
  - `key`: The encryption key.

### Cursed

Provides time-based encryption with a curse option that triggers an action if decryption is attempted before the unlock time.

#### Methods

- `whisper(data: string, key: Buffer, unlockDateTimeStr: string, iv1?: Buffer, curse?: boolean): string`

  - Encrypts data with a specified unlock date-time and optional curse.
  - `data`: The plaintext data to encrypt.
  - `key`: The encryption key (32 bytes for AES-256).
  - `unlockDateTimeStr`: The unlock date-time in 'DD-MM-YYYY HH:mm' format.
  - `iv1`: Optional initialization vector (IV).
  - `curse`: Optional boolean to enable the curse feature.

- `peek(encryptedData: string, key: Buffer): string`
  - Decrypts data if the current time is past the unlock date-time; triggers curse if enabled.
  - `encryptedData`: The encrypted data.
  - `key`: The encryption key.

### Treasure

Provides simple encryption and decryption without time-based restrictions.

#### Methods

- `bury(data: string, key: Buffer): string`

  - Encrypts data.
  - `data`: The plaintext data to encrypt.
  - `key`: The encryption key (32 bytes for AES-256).

- `dig(encryptedData: string, key: Buffer): string`
  - Decrypts data.
  - `encryptedData`: The encrypted data.
  - `key`: The encryption key.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
