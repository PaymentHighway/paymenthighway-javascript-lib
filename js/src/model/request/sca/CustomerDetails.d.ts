import { PhoneNumber } from './PhoneNumber';
export declare class CustomerDetails {
    shipping_address_matches_billing_address?: boolean;
    name?: string;
    email?: string;
    home_phone?: PhoneNumber;
    mobile_phone?: PhoneNumber;
    work_phone?: PhoneNumber;
    constructor(shipping_address_matches_billing_address?: boolean, name?: string, email?: string, home_phone?: PhoneNumber, mobile_phone?: PhoneNumber, work_phone?: PhoneNumber);
    static Builder(): CustomerDetailsBuilder.RequestBuilder;
}
export declare namespace CustomerDetailsBuilder {
    class RequestBuilder {
        private shipping_address_matches_billing_address;
        private name;
        private email;
        private home_phone;
        private mobile_phone;
        private work_phone;
        /**
         * @param shippingAddressMatchesBillingAddress Does the shipping address matches the billing address
         */
        setShippingAddressMatchesBillingAddress(shippingAddressMatchesBillingAddress: boolean): this;
        /**
         * @param name Customer name. max length 45
         */
        setName(name: string): this;
        /**
         * @param email Customer email. max length 254
         */
        setEmail(email: string): this;
        /**
         * @param phoneNumber Home phone number
         */
        setHomePhone(phoneNumber: PhoneNumber): this;
        /**
         * @param phoneNumber Mobile phone number
         */
        setMobilePhone(phoneNumber: PhoneNumber): this;
        /**
         * @param phoneNumber Work phone number
         */
        setWorkPhone(phoneNumber: PhoneNumber): this;
        build(): CustomerDetails;
    }
}
