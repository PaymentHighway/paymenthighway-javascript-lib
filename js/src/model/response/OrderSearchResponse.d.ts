import { Response } from './Response';
import { TransactionStatus } from './TransactionStatus';
import { PivoTransactionStatus } from './PivoTransactionStatus';
export interface OrderSearchResponse extends Response {
    transactions: TransactionStatus[];
    pivoTransactions: PivoTransactionStatus[];
}
