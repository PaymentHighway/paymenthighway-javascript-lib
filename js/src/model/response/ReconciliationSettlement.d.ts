import { Status } from './Status';
import { Acquirer } from './Acquirer';
import { ReconciliationTransaction } from './ReconciliationTransaction';
import { UnallocatedTransaction } from './UnallocatedTransaction';
export interface ReconciliationSettlement {
    acquirer_batch_id: string;
    status: Status;
    batch: string;
    date_processed: string;
    reference: string;
    acquirer: Acquirer;
    transaction_count: string;
    net_amount: string;
    currency: string;
    transactions: ReconciliationTransaction[];
    main_acquirer_merchant_id: string;
    unallocated_transactions_count: string;
    unallocated_transactions: UnallocatedTransaction[];
}
