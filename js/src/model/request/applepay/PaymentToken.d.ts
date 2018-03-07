import { PaymentTokenHeader } from './PaymentTokenHeader';
export declare class PaymentToken {
    data: string;
    header: PaymentTokenHeader;
    signature: string;
    version: string;
    constructor(data: string, header: PaymentTokenHeader, signature: string, version: string);
}
