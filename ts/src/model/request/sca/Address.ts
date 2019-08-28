export class Address {
    constructor(
        public city?: string,
        public country?: string,
        public address_line_1?: string,
        public address_line_2?: string,
        public address_line_3?: string,
        public post_code?: string,
        public state?: string
    ) {
    }

    public static Builder(): AddressBuilder.RequestBuilder {
        return new AddressBuilder.RequestBuilder();
    }
}

export namespace AddressBuilder {
    export class RequestBuilder {
        private city: string;
        private country: string;
        private address_line_1: string;
        private address_line_2: string;
        private address_line_3: string;
        private post_code: string;
        private state: string;

        /**
         * @param city max length 50, City name
         */
        public setCity(city: string) {
            this.city = city;
            return this;
        }

        /**
         * @param country 3 digits country code, 3166-1 numeric (eg. Finland = "246")
         */
        public setCountry(country: string) {
            this.country = country;
            return this;
        }

        /**
         * @param addressLine1 max length 50, Address line 1
         */
        public setAddressLine1(addressLine1: string) {
            this.address_line_1 = addressLine1;
            return this;
        }

        /**
         * @param addressLine2 max length 50, Address line 2
         */
        public setAddressLine2(addressLine2: string) {
            this.address_line_2 = addressLine2;
            return this;
        }

        /**
         * @param addressLine3 max length 50, Address line 3
         */
        public setAddressLine3(addressLine3: string) {
            this.address_line_3 = addressLine3;
            return this;
        }

        /**
         * @param postCode max length 16, Zip code
         */
        public setPostCode(postCode: string) {
            this.post_code = postCode;
            return this;
        }

        /**
         * @param state String length 2, ISO 3166-2 country subdivision code (eg. Uusimaa = "18")
         */
        public setState(state: string) {
            this.state = state;
            return this;
        }

        public build(): Address {
            return new Address(
                this.city,
                this.country,
                this.address_line_1,
                this.address_line_2,
                this.address_line_3,
                this.post_code,
                this.state
            );
        }
    }
}