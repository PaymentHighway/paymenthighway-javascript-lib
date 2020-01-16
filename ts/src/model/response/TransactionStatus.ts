import {CardResponse} from './CardResponse';
import {Status} from './Status';
import {Acquirer} from './Acquirer';
import {Revert} from './Revert';
import {Customer} from './Customer';
import {Splitting} from '../Splitting';

export interface TransactionStatus {
    id: string;
    acquirer: Acquirer;
    type: string;
    amount: number;
    current_amount: number;
    currency: string;
    timestamp: string;
    modified: string;
    filing_code: string;
    authorization_code?: string;
    token?: string;
    status: Status;
    card: CardResponse;
    reverts?: Revert[];
    customer?: Customer;
    cardholder_authentication: string;
    order?: string;
    committed: boolean;
    committed_amount?: string;
    recurring: boolean;
    splitting: Splitting;
    reference_number?: string;
}
