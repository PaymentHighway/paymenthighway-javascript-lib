import {Card} from './Card';
import {Token} from '../Token';
import {Customer} from '../response/Customer';
import {Splitting} from '../Splitting';
import { Request } from './PhRequest';

export class TransactionRequest extends Request {
    public card: Card;
    public amount: number;
    public currency: string;
    public token: Token;
    public order: string;
    public customer: Customer;
    public commit: boolean;
    public splitting: Splitting;
    public reference_number?: string;

    constructor(cardOrToken: Card|Token, amount: number, currency: string, order?: string, customer?: Customer, commit?: boolean, splitting?: Splitting, referenceNumber?: string) {
        super();

        if (cardOrToken instanceof Card) {
            this.card = cardOrToken;
        } else {
            this.token = cardOrToken;
        }
        this.amount = amount;
        this.currency = currency;
        this.order = order;
        this.customer = customer;
        this.commit = commit;
        this.splitting = splitting;
        this.reference_number = referenceNumber;
    }
}
