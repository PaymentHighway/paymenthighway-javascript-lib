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
         * 3 digit country code, ISO 3166-1
         * For example:
         *  Canada: 124
         *  China: 156
         *  Denmark: 208
         *  Estonia: 233
         *  Finland: 246
         *  France: 250
         *  Germany: 276
         *  Japan: 392
         *  Netherlands: 528
         *  Norway: 578
         *  Poland: 616
         *  Russia: 643
         *  Spain: 724
         *  Sweden: 752
         *  Switzerland: 756
         *  United Kingdom: 826
         *  United States of America: 840
         *
         * @see <a href="https://en.wikipedia.org/wiki/ISO_3166-1_numeric">https://www.iso.org/obp/ui/#search/code/</a>
         * @see <a href="https://en.wikipedia.org/wiki/ISO_3166-1_numeric">https://en.wikipedia.org/wiki/ISO_3166-1_numeric</a>
         *
         * @param country 3 digits country code, ISO 3166-1 numeric
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