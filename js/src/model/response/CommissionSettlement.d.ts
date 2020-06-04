import { Acquirer } from './Acquirer';
export interface CommissionSettlement {
    acquirer_batch_id: string;
    batch: string;
    date_processed: string;
    reference: string;
    acquirer: Acquirer;
    amount: string;
    currency: string;
    main_acquirer_merchant_id: string;
}
