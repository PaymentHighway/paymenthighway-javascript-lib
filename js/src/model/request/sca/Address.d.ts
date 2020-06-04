export declare class Address {
    city?: string;
    country?: string;
    address_line_1?: string;
    address_line_2?: string;
    address_line_3?: string;
    post_code?: string;
    state?: string;
    constructor(city?: string, country?: string, address_line_1?: string, address_line_2?: string, address_line_3?: string, post_code?: string, state?: string);
    static Builder(): AddressBuilder.RequestBuilder;
}
export declare namespace AddressBuilder {
    class RequestBuilder {
        private city;
        private country;
        private address_line_1;
        private address_line_2;
        private address_line_3;
        private post_code;
        private state;
        /**
         * @param city max length 50, City name
         */
        setCity(city: string): this;
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
        setCountry(country: string): this;
        /**
         * @param addressLine1 max length 50, Address line 1
         */
        setAddressLine1(addressLine1: string): this;
        /**
         * @param addressLine2 max length 50, Address line 2
         */
        setAddressLine2(addressLine2: string): this;
        /**
         * @param addressLine3 max length 50, Address line 3
         */
        setAddressLine3(addressLine3: string): this;
        /**
         * @param postCode max length 16, Zip code
         */
        setPostCode(postCode: string): this;
        /**
         * @param state String length 2, ISO 3166-2 country subdivision code (eg. Uusimaa = "18")
         */
        setState(state: string): this;
        build(): Address;
    }
}
