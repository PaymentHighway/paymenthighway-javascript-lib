import {PaymentTokenHeader} from './PaymentTokenHeader';

export class PaymentToken {
    constructor(public data: string,
                public header: PaymentTokenHeader,
                public signature: string,
                public version: string) {
    }
}
