import { PaymentDataHeader } from './PaymentDataHeader';
export declare class PaymentData {
    data: string;
    header: PaymentDataHeader;
    signature: string;
    version: string;
    constructor(data: string, header: PaymentDataHeader, signature: string, version: string);
}
