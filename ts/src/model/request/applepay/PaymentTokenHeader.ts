export class PaymentTokenHeader {
    constructor(public ephemeralPublicKey: string,
                public publicKeyHash: string,
                public transactionId: string,
                public applicationData?: string) {
    }
}
