"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomerDetails {
    constructor(shipping_address_matches_billing_address, name, email, home_phone, mobile_phone, work_phone) {
        this.shipping_address_matches_billing_address = shipping_address_matches_billing_address;
        this.name = name;
        this.email = email;
        this.home_phone = home_phone;
        this.mobile_phone = mobile_phone;
        this.work_phone = work_phone;
    }
    static Builder() {
        return new CustomerDetailsBuilder.RequestBuilder();
    }
}
exports.CustomerDetails = CustomerDetails;
var CustomerDetailsBuilder;
(function (CustomerDetailsBuilder) {
    class RequestBuilder {
        /**
         * @param shippingAddressMatchesBillingAddress Does the shipping address matches the billing address
         */
        setShippingAddressMatchesBillingAddress(shippingAddressMatchesBillingAddress) {
            this.shipping_address_matches_billing_address = shippingAddressMatchesBillingAddress;
            return this;
        }
        /**
         * @param name Customer name. max length 45
         */
        setName(name) {
            this.name = name;
            return this;
        }
        /**
         * @param email Customer email. max length 254
         */
        setEmail(email) {
            this.email = email;
            return this;
        }
        /**
         * @param phoneNumber Home phone number
         */
        setHomePhone(phoneNumber) {
            this.home_phone = phoneNumber;
            return this;
        }
        /**
         * @param phoneNumber Mobile phone number
         */
        setMobilePhone(phoneNumber) {
            this.mobile_phone = phoneNumber;
            return this;
        }
        /**
         * @param phoneNumber Work phone number
         */
        setWorkPhone(phoneNumber) {
            this.work_phone = phoneNumber;
            return this;
        }
        build() {
            return new CustomerDetails(this.shipping_address_matches_billing_address, this.name, this.email, this.home_phone, this.mobile_phone, this.work_phone);
        }
    }
    CustomerDetailsBuilder.RequestBuilder = RequestBuilder;
})(CustomerDetailsBuilder = exports.CustomerDetailsBuilder || (exports.CustomerDetailsBuilder = {}));
//# sourceMappingURL=CustomerDetails.js.map