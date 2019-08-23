import { Card } from './Card';
import { Token } from '../Token';
import { Customer } from '../response/Customer';
import { Splitting } from '../Splitting';
import { StrongCustomerAuthentication } from './sca/StrongCustomerAuthentication';
import { Request } from './PhRequest';
export declare class ChargeCitRequest extends Request {
    card: Card;
    amount: number;
    currency: string;
    token: Token;
    order: string;
    customer: Customer;
    commit: boolean;
    splitting: Splitting;
    use_exemptions: boolean;
    strong_customer_authentication: StrongCustomerAuthentication;
    constructor(cardOrToken: Card | Token, amount: number, currency: string, strong_customer_authentication: StrongCustomerAuthentication, order?: string, customer?: Customer, commit?: boolean, splitting?: Splitting);
}
