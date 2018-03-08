export class PaymentDataHeader {
    constructor(public ephemeralPublicKey: string,
                public publicKeyHash: string,
                public transactionId: string,
                public applicationData?: string) {
    }
}
