import { Request } from './PhRequest';

export class MasterpassTransactionRequest extends Request {
    public amount: number;
    public currency: string;
    public commit: boolean;
    public reference_number?: string;

    constructor(amount: number, currency: string, commit?: boolean, referenceNumber?: string) {
        super();
        this.amount = amount;
        this.currency = currency;
        this.commit = commit;
        this.reference_number = referenceNumber;
    }
}
