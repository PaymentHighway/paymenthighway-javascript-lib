import { PivoTransactionStatus } from './PivoTransactionStatus';
import { Response } from './Response';
export interface PivoTransactionStatusResponse extends Response {
    transaction: PivoTransactionStatus;
}
