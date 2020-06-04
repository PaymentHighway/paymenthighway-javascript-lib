import { DebitResponse } from './DebitResponse';
export interface ChargeCitResponse extends DebitResponse {
    three_d_secure_url?: string;
}
