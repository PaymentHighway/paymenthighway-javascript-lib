import {Address} from './Address';

export interface ShippingAddress extends Address {
    recipient_name?: string;
}