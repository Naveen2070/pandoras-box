/// <reference types="node" />
export declare function encrypt(data: string, key: Buffer, iv?: Buffer): string;
export declare function decrypt(encryptedData: string, key: Buffer): string;
declare const Cassandra: {
    encrypt: typeof encrypt;
    decrypt: typeof decrypt;
};
export default Cassandra;
