export declare class CustomerAuthenticationInfo {
    method?: Method;
    timestamp?: string;
    data?: string;
    /**
     * @param method Information about how the cardholder is authenticated before or during the transaction.
     * @param timestamp Date and time in UTC of the cardholder authentication. Date format: "yyyy-MM-dd'T'HH:mm:ss'Z'", e.g. 2019-08-27T09:22:52Z
     * @param data Data that documents and supports a specific authentication process. Only populate if instructed to do so. Max length 2048
     */
    constructor(method?: Method, timestamp?: string, data?: string);
    static Builder(): CustomerAuthenticationInfoBuilder.RequestBuilder;
}
export declare namespace CustomerAuthenticationInfoBuilder {
    class RequestBuilder {
        private method;
        private timestamp;
        private data;
        setMethod(method: Method): this;
        setTimestamp(timestamp: string): this;
        setData(data: string): this;
        build(): CustomerAuthenticationInfo;
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
export declare enum Method {
    NoAuthentication = "01",
    OwnCredentials = "02",
    FederatedId = "03",
    IssuerCredentials = "04",
    ThirdPartyAuthentication = "05",
    FidoAuthenticator = "06",
    FidoAuthenticatorWithAssuranceDataSigned = "07",
    SrcAssuranceData = "08"
}
