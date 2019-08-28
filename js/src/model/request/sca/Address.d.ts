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
         * @param country 3 digits country code, 3166-1 numeric (eg. Finland = "246")
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
