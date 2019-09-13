import { PaymentHighwayUtility } from '../../PaymentHighwayUtility';

export class Request {
    public requestId: string;

    constructor() {
        this.requestId = PaymentHighwayUtility.createRequestId();
    }
}