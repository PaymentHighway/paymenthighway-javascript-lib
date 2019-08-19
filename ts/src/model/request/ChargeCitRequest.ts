import {Card} from './Card';
import {Token} from '../Token';
import {Customer} from '../response/Customer';
import {Splitting} from '../Splitting';
import { StrongCustomerAuthentication } from './StrongCustomerAuthentication';

export class ChargeCitRequest {
    public card: Card;
    public amount: number;
    public currency: string;
    public token: Token;
    public order: string;
    public customer: Customer;
    public commit: boolean;
    public splitting: Splitting;
    public use_exemptions: boolean;
    public strong_customer_authentication: StrongCustomerAuthentication

    constructor(cardOrToken: Card|Token, amount: number, currency: string, strong_customer_authentication: StrongCustomerAuthentication, order?: string, customer?: Customer, commit?: boolean, splitting?: Splitting, use_exemptions?: boolean ) {
        if (cardOrToken instanceof Card) {
            this.card = cardOrToken;
        } else {
            this.token = cardOrToken;
        }
        this.amount = amount;
        this.currency = currency;
        this.strong_customer_authentication = strong_customer_authentication;
        this.order = order;
        this.customer = customer;
        this.commit = commit;
        this.splitting = splitting;
        this.use_exemptions = use_exemptions;
    }
}
