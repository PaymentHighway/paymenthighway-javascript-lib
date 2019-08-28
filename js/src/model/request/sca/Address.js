"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Address {
    constructor(city, country, address_line_1, address_line_2, address_line_3, post_code, state) {
        this.city = city;
        this.country = country;
        this.address_line_1 = address_line_1;
        this.address_line_2 = address_line_2;
        this.address_line_3 = address_line_3;
        this.post_code = post_code;
        this.state = state;
    }
    static Builder() {
        return new AddressBuilder.RequestBuilder();
    }
}
exports.Address = Address;
var AddressBuilder;
(function (AddressBuilder) {
    class RequestBuilder {
        /**
         * @param city max length 50, City name
         */
        setCity(city) {
            this.city = city;
            return this;
        }
        /**
         * @param country 3 digits country code, 3166-1 numeric (eg. Finland = "246")
         */
        setCountry(country) {
            this.country = country;
            return this;
        }
        /**
         * @param addressLine1 max length 50, Address line 1
         */
        setAddressLine1(addressLine1) {
            this.address_line_1 = addressLine1;
            return this;
        }
        /**
         * @param addressLine2 max length 50, Address line 2
         */
        setAddressLine2(addressLine2) {
            this.address_line_2 = addressLine2;
            return this;
        }
        /**
         * @param addressLine3 max length 50, Address line 3
         */
        setAddressLine3(addressLine3) {
            this.address_line_3 = addressLine3;
            return this;
        }
        /**
         * @param postCode max length 16, Zip code
         */
        setPostCode(postCode) {
            this.post_code = postCode;
            return this;
        }
        /**
         * @param state String length 2, ISO 3166-2 country subdivision code (eg. Uusimaa = "18")
         */
        setState(state) {
            this.state = state;
            return this;
        }
        build() {
            return new Address(this.city, this.country, this.address_line_1, this.address_line_2, this.address_line_3, this.post_code, this.state);
        }
    }
    AddressBuilder.RequestBuilder = RequestBuilder;
})(AddressBuilder = exports.AddressBuilder || (exports.AddressBuilder = {}));
//# sourceMappingURL=Address.js.map