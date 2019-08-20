import { PhoneNumber } from "./PhoneNumber";
export declare class CustomerDetails {
    shipping_address_matches_billing_address?: boolean;
    name?: string;
    email?: string;
    home_phone?: PhoneNumber;
    mobile_phone?: PhoneNumber;
    work_phone?: PhoneNumber;
    /**
     * @param shipping_address_matches_billing_address Does the shipping address matches the billing address
     * @param name Customer name. max length 45
     * @param email Customer email. max length 254
     * @param home_phone
     * @param mobile_phone
     * @param work_phone
     */
    constructor(shipping_address_matches_billing_address?: boolean, name?: string, email?: string, home_phone?: PhoneNumber, mobile_phone?: PhoneNumber, work_phone?: PhoneNumber);
}
