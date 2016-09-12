import {Response} from './Response';
import {ReconciliationSettlement} from './ReconciliationSettlement';
import {CommissionSettlement} from './CommissionSettlement';

export interface ReconciliationReportResponse extends Response {
    settlements: ReconciliationSettlement[];
    commission_settlements: CommissionSettlement[];
}
