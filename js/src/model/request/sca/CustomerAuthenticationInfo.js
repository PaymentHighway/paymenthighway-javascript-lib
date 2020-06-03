"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomerAuthenticationInfo {
    /**
     * @param method Information about how the cardholder is authenticated before or during the transaction.
     * @param timestamp Date and time in UTC of the cardholder authentication. Date format: "yyyy-MM-dd'T'HH:mm:ss'Z'", e.g. 2019-08-27T09:22:52Z
     * @param data Data that documents and supports a specific authentication process. Only populate if instructed to do so. Max length 2048
     */
    constructor(method, timestamp, data) {
        this.method = method;
        this.timestamp = timestamp;
        this.data = data;
    }
    static Builder() {
        return new CustomerAuthenticationInfoBuilder.RequestBuilder();
    }
}
exports.CustomerAuthenticationInfo = CustomerAuthenticationInfo;
var CustomerAuthenticationInfoBuilder;
(function (CustomerAuthenticationInfoBuilder) {
    class RequestBuilder {
        setMethod(method) {
            this.method = method;
            return this;
        }
        setTimestamp(timestamp) {
            this.timestamp = timestamp;
            return this;
        }
        setData(data) {
            this.data = data;
            return this;
        }
        build() {
            return new CustomerAuthenticationInfo(this.method, this.timestamp, this.data);
        }
    }
    CustomerAuthenticationInfoBuilder.RequestBuilder = RequestBuilder;
})(CustomerAuthenticationInfoBuilder = exports.CustomerAuthenticationInfoBuilder || (exports.CustomerAuthenticationInfoBuilder = {}));
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
var Method;
(function (Method) {
    Method["NoAuthentication"] = "01";
    Method["OwnCredentials"] = "02";
    Method["FederatedId"] = "03";
    Method["IssuerCredentials"] = "04";
    Method["ThirdPartyAuthentication"] = "05";
    Method["FidoAuthenticator"] = "06";
    Method["FidoAuthenticatorWithAssuranceDataSigned"] = "07";
    Method["SrcAssuranceData"] = "08";
})(Method = exports.Method || (exports.Method = {}));
//# sourceMappingURL=CustomerAuthenticationInfo.js.map