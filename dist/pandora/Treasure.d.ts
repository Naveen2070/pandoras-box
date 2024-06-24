/// <reference types="node" />
export declare function bury(data: string, key: Buffer, iv1?: Buffer): string;
export declare function dig(encryptedData: string, key: Buffer): string;
declare const Treasure: {
    bury: typeof bury;
    dig: typeof dig;
};
export default Treasure;
