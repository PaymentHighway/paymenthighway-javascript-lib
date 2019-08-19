import { ScaPhoneNumber } from "./ScaPhoneNumber";
export declare class ScaCustomerDetails {
    shipping_address_matches_billing_address?: boolean;
    name?: string;
    email?: string;
    home_phone?: ScaPhoneNumber;
    mobile_phone?: ScaPhoneNumber;
    work_phone?: ScaPhoneNumber;
    constructor(shipping_address_matches_billing_address?: boolean, name?: string, email?: string, home_phone?: ScaPhoneNumber, mobile_phone?: ScaPhoneNumber, work_phone?: ScaPhoneNumber);
}
