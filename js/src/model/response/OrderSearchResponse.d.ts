import { Response } from './Response';
import { TransactionStatus } from './TransactionStatus';
import { PivoTransactionStatus } from './PivoTransactionStatus';
import { AfterPayTransactionStatus } from './AfterPayTransactionStatus';
export interface OrderSearchResponse extends Response {
    transactions: TransactionStatus[];
    pivo_transactions: PivoTransactionStatus[];
    afterpay_transactions: AfterPayTransactionStatus[];
}
