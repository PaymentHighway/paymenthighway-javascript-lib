import {Response} from './Response';
import {AfterPayTransactionStatus} from './AfterPayTransactionStatus';

export interface AfterPayTransactionStatusResponse extends Response {
    transaction: AfterPayTransactionStatus;
}
