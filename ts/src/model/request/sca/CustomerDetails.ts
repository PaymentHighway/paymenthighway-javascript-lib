import {PhoneNumber} from './PhoneNumber';

export class CustomerDetails {
    constructor(
        public shipping_address_matches_billing_address?: boolean,
        public name?: string,
        public email?: string,
        public home_phone?: PhoneNumber,
        public mobile_phone?: PhoneNumber,
        public work_phone?: PhoneNumber
    ) {
    }

    public static Builder(): CustomerDetailsBuilder.RequestBuilder {
        return new CustomerDetailsBuilder.RequestBuilder();
    }
}

export namespace CustomerDetailsBuilder {
    export class RequestBuilder {
        private shipping_address_matches_billing_address: boolean;
        private name: string;
        private email: string;
        private home_phone: PhoneNumber;
        private mobile_phone: PhoneNumber;
        private work_phone: PhoneNumber;

        /**
         * @param shippingAddressMatchesBillingAddress Does the shipping address matches the billing address
         */
        public setShippingAddressMatchesBillingAddress(shippingAddressMatchesBillingAddress: boolean) {
            this.shipping_address_matches_billing_address = shippingAddressMatchesBillingAddress;
            return this;
        }

        /**
         * @param name Customer name. max length 45
         */
        public setName(name: string) {
            this.name = name;
            return this;
        }

        /**
         * @param email Customer email. max length 254
         */
        public setEmail(email: string) {
            this.email = email;
            return this;
        }

        /**
         * @param phoneNumber Home phone number
         */
        public setHomePhone(phoneNumber: PhoneNumber) {
            this.home_phone = phoneNumber;
            return this;
        }

        /**
         * @param phoneNumber Mobile phone number
         */
        public setMobilePhone(phoneNumber: PhoneNumber) {
            this.mobile_phone = phoneNumber;
            return this;
        }

        /**
         * @param phoneNumber Work phone number
         */
        public setWorkPhone(phoneNumber: PhoneNumber) {
            this.work_phone = phoneNumber;
            return this;
        }

        public build(): CustomerDetails {
            return new CustomerDetails(
                this.shipping_address_matches_billing_address,
                this.name,
                this.email,
                this.home_phone,
                this.mobile_phone,
                this.work_phone
            );
        }
    }
}