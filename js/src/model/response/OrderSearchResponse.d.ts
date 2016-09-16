import { Response } from './Response';
import { TransactionStatus } from './TransactionStatus';
export interface OrderSearchResponse extends Response {
    transactions: TransactionStatus[];
}
