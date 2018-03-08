import {PaymentDataHeader} from './PaymentDataHeader';

export class PaymentData {
    constructor(public data: string,
                public header: PaymentDataHeader,
                public signature: string,
                public version: string) {
    }
}
