import { Request } from './PhRequest';

export class MasterpassTransactionRequest extends Request {
    public amount: number;
    public currency: string;
    public commit: boolean;

    constructor(amount: number, currency: string, commit?: boolean) {
        super();
        this.amount = amount;
        this.currency = currency;
        this.commit = commit;
    }
}
