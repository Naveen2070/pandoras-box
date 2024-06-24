/// <reference types="node" />
export declare function hibernate(data: string, key: Buffer, unlockDateTimeStr: string, iv1?: Buffer): string;
export declare function arise(encryptedData: string, key: Buffer): string;
declare const TimeCapsule: {
    hibernate: typeof hibernate;
    arise: typeof arise;
};
export default TimeCapsule;
