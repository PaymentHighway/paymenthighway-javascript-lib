export class MasterpassTransactionRequest {
    public amount: number;
    public currency: string;
    public commit: boolean;

    constructor(amount: number, currency: string, commit?: boolean) {
        this.amount = amount;
        this.currency = currency;
        this.commit = commit;
    }
}
