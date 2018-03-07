export declare class PaymentTokenHeader {
    ephemeralPublicKey: string;
    publicKeyHash: string;
    transactionId: string;
    applicationData: string;
    constructor(ephemeralPublicKey: string, publicKeyHash: string, transactionId: string, applicationData?: string);
}
