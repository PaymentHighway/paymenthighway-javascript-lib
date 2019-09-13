export class CustomerAuthenticationInfo {

    /**
     * @param method Information about how the cardholder is authenticated before or during the transaction.
     * @param timestamp Date and time in UTC of the cardholder authentication. Date format: "yyyy-MM-dd'T'HH:mm:ss'Z'", e.g. 2019-08-27T09:22:52Z
     * @param data Data that documents and supports a specific authentication process. Only populate if instructed to do so. Max length 2048
     */
    constructor(
        public method?: Method,
        public timestamp?: string,
        public data?: string
    ) {
    }

    public static Builder(): CustomerAuthenticationInfoBuilder.RequestBuilder {
        return new CustomerAuthenticationInfoBuilder.RequestBuilder();
    }
}

export namespace CustomerAuthenticationInfoBuilder {
    export class RequestBuilder {
        private method: Method;
        private timestamp: string;
        private data: string;

        public setMethod(method: Method) {
            this.method = method;
            return this;
        }

        public setTimestamp(timestamp: string) {
            this.timestamp = timestamp;
            return this;
        }

        public setData(data: string) {
            this.data = data;
            return this;
        }

        public build(): CustomerAuthenticationInfo {
            return new CustomerAuthenticationInfo(
                this.method,
                this.timestamp,
                this.data
            );
        }
    }
}

/**
 * Information about how the cardholder is authenticated before or during the transaction.
 *
 * 01 = No 3DS Requestor authentication occurred (i.e. cardholder “logged in” as guest)
 * 02 = Login to the cardholder account at the 3DS Requestor system using 3DS Requestor’s own credentials
 * 03 = Login to the cardholder account at the 3DS Requestor system using federated ID
 * 04 = Login to the cardholder account at the 3DS Requestor system using issuer credentials
 * 05 = Login to the cardholder account at the 3DS Requestor system using third-party authentication
 * 06 = Login to the cardholder account at the 3DS Requestor system using FIDO Authenticator
 * 07 = Login to the cardholder account at the 3DS Requestor system using FIDO Authenticator (FIDO assurance data signed)
 * 08 = SRC Assurance Data
 */
export enum Method {
    NoAuthentication = '01',
    OwnCredentials = '02',
    FederatedId = '03',
    IssuerCredentials = '04',
    ThirdPartyAuthentication = '05',
    FidoAuthenticator = '06',
    FidoAuthenticatorWithAssuranceDataSigned = '07',
    SrcAssuranceData = '08'
}