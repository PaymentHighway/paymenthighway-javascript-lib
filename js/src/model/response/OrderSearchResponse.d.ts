import { Response } from './Response';
import { TransactionStatus } from './TransactionStatus';
import { PivoTransactionStatus } from './PivoTransactionStatus';
import { SiirtoTransactionStatus } from './SiirtoTransactionStatus';
import { AfterPayTransactionStatus } from './AfterPayTransactionStatus';
export interface OrderSearchResponse extends Response {
    transactions: TransactionStatus[];
    pivo_transactions: PivoTransactionStatus[];
    siirto_transactions: SiirtoTransactionStatus[];
    afterpay_transactions: AfterPayTransactionStatus[];
}
