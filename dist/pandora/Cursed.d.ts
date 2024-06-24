/// <reference types="node" />
export declare function whisper(data: string, key: Buffer, unlockDateTimeStr: string, iv1?: Buffer, curse?: boolean): string;
export declare function peek(encryptedData: string, key: Buffer): string;
declare const Cursed: {
    whisper: typeof whisper;
    peek: typeof peek;
};
export default Cursed;
