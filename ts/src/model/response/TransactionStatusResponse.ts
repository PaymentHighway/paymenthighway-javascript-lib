import {TransactionStatus} from './TransactionStatus';
import {Response} from './Response';

export interface TransactionStatusResponse extends Response {
    transaction: TransactionStatus;
}
