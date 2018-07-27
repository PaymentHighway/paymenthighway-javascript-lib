import {Response} from './Response';
import {SiirtoTransactionStatus} from './SiirtoTransactionStatus';

export interface SiirtoTransactionStatusResponse extends Response {
    transaction: SiirtoTransactionStatus;
}
