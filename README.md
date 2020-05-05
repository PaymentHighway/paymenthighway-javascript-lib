# Payment Highway JavaScript API Library

[![][Build Status img]][Build Status]
![node](https://img.shields.io/node/v/paymenthighway.svg)


This is an example implementation of the communication with the Payment Highway API using JavaScript/TypeScript. 
The Form API and Payment API implement the basic functionality of the Payment Highway.

This code is provided as-is, use it as inspiration, reference or drop it directly into your own project and use it.

For full documentation on the PaymentHighway API visit our developer website: https://paymenthighway.fi/dev/

## Installation
```
npm install paymenthighway
```

# Overview
Start with building the HTTP form parameters by using the FormParameterBuilder.

### FormBuilder

Create an instance of the builder, then use the generate methods to receive a list of parameters for each API call.

#### Initializing the builder

```javascript
var paymentHighway = require('paymenthighway');

var method = 'POST';
var testKey = 'testKey';
var testSecret = 'testSecret';
var account = 'test';
var merchant = 'test_merchantId';
var serviceUrl = 'https://v1-hub-staging.sph-test-solinor.com';

var formBuilder = new paymentHighway.FormBuilder(
        method, 
        testKey, 
        testSecret, 
        account, 
        merchant, 
        serviceUrl
    );
```

Example common parameters for the following form generation functions

```javascript
var successUrl = 'https://example.com/success';
var failureUrl = 'https://example.com/failure';
var cancelUrl = 'https://example.com/cancel';
var language = 'EN';
```
Each method returns a FormContainer [(TS)](/ts/src/FormContainer.ts)/[(JS)](/js/src/FormContainer.js) object, which provides required hidden fields for the HTML form to make a successful transaction to Form API. The builder will generate a request id, timestamp, and secure signature for the transactions, which are included in the FormContainer fields.

In order to charge a card given in the Form API, the corresponding transaction id must be committed by using Payment API.
```javascript
class FormContainer {
    constructor(public method: Method,
                public baseUrl: string,
                public actionUrl: string,
                public nameValuePairs: Pair<string, string>[],
                public requestId: string) {
    }

    public getAction(): string {
        return this.baseUrl + this.actionUrl;
    }
}
```
#### GenerateAddCardParameters
```javascript
var formContainer = formBuilder.generateAddCardParameters(successUrl, failureUrl, cancelUrl, language);
// form parameters
var action = formContainer.getAction();
var method = formContainer.method;          // 'GET'|'POST'
var fields = formContainer.nameValuePairs;  // Pair<string, string> []

fields.forEach((pair) => {
    pair.first;
    pair.second;
});
```

#### GeneratePaymentParameters
```javascript 
var amount = 1950;
var currency = 'EUR';
var orderId = '1000123A';
var description = '10 balloons 19,50€';

var formContainer = formBuilder.generatePaymentParameters(
        successUrl, 
        failureUrl, 
        cancelUrl, 
        language, 
        amount, 
        currency, 
        orderId, 
        description
    );
```
#### GenerateGetAddCardAndPaymentParameters
```javascript
var amount = 1990;
var currency = 'EUR';
var orderId = '1000123A';
var description = 'A Box of Dreams. 19,90€';

var formContainer = formBuilder.generateAddCardAndPaymentParameters(
        successUrl, 
        failureUrl, 
        cancelUrl, 
        language, 
        amount, 
        currency, 
        orderId, 
        description
    );
```

#### Simple MobilePay form payment
```javascript
var amount = 1990;
var currency = 'EUR';
var orderId = '1000123A';
var description = 'A Box of Dreams. 19,90€';

var formContainer = formBuilder.generatePayWithMobilePayParameters(
        successUrl, 
        failureUrl, 
        cancelUrl, 
        language, 
        amount, 
        currency, 
        orderId, 
        description
    );
```

_MobilePay payment is to be committed as any other Form Payment_

#### MobilePay form payment with optional parameters
```javascript
var amount = 1990;
var currency = 'EUR';
var orderId = '1000123A';
var description = 'A Box of Dreams. 19,90€';
var exitIframeOnResult = undefined;
var logoUrl = 'https://foo.bar/biz.png';
var phoneNumber = '+358401234567';
var shopName = 'Jaskan kenkä';

var formContainer = formBuilder.generatePayWithMobilePayParameters(
        successUrl, 
        failureUrl, 
        cancelUrl, 
        language, 
        amount, 
        currency, 
        orderId, 
        description,
        exitIframeOnResult,
        logoUrl,
        phoneNumber,
        shopName
    );
```
##### About shop logo in MobilePay
* The logo must be 250x250 pixel in .png format. 
* MPO will show a default logo in the app if this is empty or the image location doesn’t exist. 
* Once a ShopLogoURL has been sent to MPOnline the .png-file on that URL must never be changed. If the shop wants a new (or more than one) logo, a new ShopLogoURL must be used. 
* The logo must be hosted on a HTTPS (secure) server.

#### Example validateFormRedirect
```javascript
// Initialize secure signer
var secureSigner = new paymentHighway.SecureSigner(testKey, testSecret);

// success route
app.get('/success', function (req, res) {
    var validRedirect = secureSigner.validateFormRedirect(req.query); // Boolean
});    

```

### PaymentApi

In order to do safe transactions, an execution model is used where the first call to /transaction acquires a financial transaction handle, later referred as “ID”, which ensures the transaction is executed exactly once. Afterwards it is possible to execute a debit transaction by using the received id handle. If the execution fails, the command can be repeated in order to confirm the transaction with the particular id has been processed. After executing the command, the status of the transaction can be checked by executing the PaymentAPI.transactionStatus("id") request.

In order to be sure that a tokenized card is valid and is able to process payment transactions the corresponding tokenization id must be used to get the actual card token.

#### Initializing the Payment API

```javascript
var serviceUrl = "https://v1-hub-staging.sph-test-solinor.com";
var testKey = 'testKey';
var testSecret = 'testSecret';
var account = 'test';
var merchant = 'test_merchantId';

var paymentAPI = new PaymentAPI(
                serviceUrl, 
                testKey, 
                testSecret, 
                account, 
                merchant
        );
```

#### Init transaction
```javascript
return paymentAPI.initTransaction();
```
* returns PromiseLike<[TransactionResponse](/ts/src/model/response/TransactionResponse.ts)>

#### Commit Form Transaction
```javascript
var amount = 1990;
var currency = 'EUR';
var request = new paymentHighway.CommitTransactionRequest(amount, currency);

return paymentAPI.commitTransaction(transactionId, request); // Returns PromiseLike
```
* takes CommitTransactionRequest[(TS)](/ts/src/model/request/CommitTransactionRequest.ts)/[(JS)](/js/src/model/request/CommitTransactionRequest.js)
* returns PromiseLike<[TransactionResponse](/ts/src/model/response/TransactionResponse.ts)>

#### Tokenize (get the actual card token by using token id)
```javascript
return paymentAPI.tokenization(tokenizationId);
```
* returns PromiseLike<[TokenizationResponse](/ts/src/model/response/TokenizationResponse.ts)>

#### Example Debit with Token

NOTE: The `debitTransaction` method will be deprecated starting from Sep 14th 2019 in favor of the new `chargeCustomerInitiatedTransaction` and `chargeMerchantInitiatedTransaction` in order to comply with the EU's PSD2 directive.

```javascript
var token = new paymentHighway.Token('tokenId');
var amount = 1990;
var currency = 'EUR';

var request = new paymentHighway.TransactionRequest(token, amount, currency);
return paymentAPI.initTransaction()
        .then(function (init) {
            return paymentAPI.debitTransaction(init.id, request);
        });
```
* returns PromiseLike<[TransactionResultResponse](/ts/src/model/response/TransactionResultResponse.ts)>

### <a name="charging_a_card_token"></a>Charging a card token

 After the introduction of the European PSD2 directive, the electronic payment transactions are categorised in so called customer initiated transactions (CIT) and merchant initiated transactions (MIT). 

 Customer initiated transactions are scenarios, where the customer actively takes part in the payment process. This also includes token, or "one-click" purchases, where the transaction uses a previously saved payment method.

 Merchant initiated transactions are payments triggered without the customer's participation. This kind of transactions can be used for example in scenarios where the final price is not known at the time of the purchase or the customer is not present when the charge is made. A prior agreement, or "mandate" between the customer and the merchant is required.
 
#### Charging a customer initiated transaction (CIT)

 When charging a token using customer initiated transaction, applicable exemptions are attempted in order to avoid the need for strong customer authentication, 3D Secure. These exemptions may include but are not limited to: low-value (under 30 EUR) or transaction risk analysis.
  
 Regardless, there is always a possibility the card issuer requires strong customer authentication by requesting a step-up. In this case, the response will contain "soft decline" result code 400 and an URL, where the customer needs to be redirected to, in order to perform the authentication. The merchant's URLs where the customer will be redirected back to - after completing the authentication - need to be defined in the `returnUrls` ([`ReturnUrls`](/ts/src/model/request/sca/ReturnUrls.ts)) parameter in [`StrongCustomerAuthentication`](/ts/src/model/request/sca/StrongCustomerAuthentication.ts).

When the customer is redirected back to the success URL, after completing the payment using strong customer authentication, the payment needs to be committed exactly as in the normal FormAPI payment flow. Please note, a new transaction ID is created for this payment and the original transaction ID from the CIT request is considered as failed. The merchant supplied "order", the request ID, or custom merchant parameters specified in the return URLs, can be used to connect the returning customer to the specific payment.

 In addition to the return urls, the [`StrongCustomerAuthentication`](/ts/src/model/request/sca/StrongCustomerAuthentication.ts) object contains many optional fields for information about the customer and the transaction. This information is used in transaction risk analysis (TRA) and may increase the likelihood of transaction being considered as low-risk, thus avoiding the need for strong authentication.

```javascript
const token = new paymentHighway.Token('tokenId');
const amount = 1990;
const currency = 'EUR';
const returnUrls = ReturnUrls.Builder(
            "https://example.com/success", // URL the user is redirected after succesful 3D-Secure authentication if strong customer authentication is required
            "https://example.com/cancel", // URL the user is redirected after cancelled 3D-Secure authentication if strong customer authentication is required
            "https://example.com/failure" // URL the user is redirected after failed 3D-Secure authentication if strong customer authentication is required
        )
        .setWebhookSuccessUrl("https://example.com/success/12345/?webhook=1")
        .setWebhookCancelUrl("https://example.com/failure/12345/?webhook=1")
        .setWebhookFailureUrl("https://example.com/webhook/failure/?webhook=1")
        .build();
const customerDetails = CustomerDetails.Builder()
        .setShippingAddressMatchesBillingAddress(true)
        .setName('Eric Example')
        .setEmail('eric.example@example.com')
        // ...
        .build();        
const sca = StrongCustomerAuthentication.Builder(returnUrls)
        .setCustomerDetails(customerDetails)
        // Optionally other information about the customer and purchase to help in transaction risk analysis (TRA)
        .build(); 


return paymentAPI.chargeCustomerInitiatedTransaction(transactionId, new ChargeCitRequest(token, amount, currency, sca));
```
* retruns PromiseLike<[ChargeCitResponse](/ts/src/model/response/ChargeCitResponse.ts)>

#### Charging a merchant initiated transaction (MIT)

When charging the customer's card in context where the customer is not actively participating in the transaction you should use the `chargeMerchantInitiatedTransaction` method. The MIT transactions are exempt from the strong customer authentication requirements of PSD2 so the request cannot be answered with "soft-decline" response (code 400) unlike customer initated transactions.

```javascript
var token = new paymentHighway.Token('tokenId');
var amount = 1990;
var currency = 'EUR';

return paymentAPI.chargeMerchantInitiatedTransaction(transactionId, new ChargeMitRequest(token, amount, currency));
```
* retruns PromiseLike<[DebitResponse](/ts/src/model/response/DebitResponse.ts)>


#### Partial Revert 
```javascript
return paymentAPI.revertTransaction(transactionId, new RevertTransactionRequest(amount));
```
* retruns PromiseLike<[TransactionResponse](/ts/src/model/response/TransactionResponse.ts)>

#### Revert whole transaction
```javascript
return paymentAPI.revertTransaction(transactionId, new RevertTransactionRequest());
```
* retruns PromiseLike<[TransactionResponse](/ts/src/model/response/TransactionResponse.ts)>

#### Transaction Status
```javascript
return paymentAPI.transactionStatus(transactionId);
```
* returns PromiseLike<[TransactionStatusResponse](/ts/src/model/response/TransactionStatusResponse.ts)>

#### Order status
```javascript 
return paymentAPI.searchOrders("order");
```
* returns PromiseLike<[OrderSearchResponse](/ts/src/model/response/OrderSearchResponse.ts)>

#### Daily batch report
```javascript
return paymentAPI.fetchDailyReport("yyyyMMdd");
```
* returns PromiseLike<[ReportResponse](/ts/src/model/response/ReportResponse.ts)>


# Errors
Payment Highway authenticates each request and if there is invalid parameters or a signature mismatch, it returns an error.
PaymentHighwayAPI returns PromiseLike from each requests.

It is recommended to gracefully handle errors from the API.
```javascript
PaymentHighwayAPI.initTransaction()
  .then(function(initResponse){
    // handle response
    ...
  })
  .catch(function(error) {
    // handle errors
    ...
  });  
```

# Help us make it better

Please tell us how we can make the API better. If you have a specific feature request or if you found a bug, please use GitHub issues. 
Fork these docs and send a pull request with improvements.


[Build Status]:https://travis-ci.org/PaymentHighway/paymenthighway-javascript-lib
[Build Status img]:https://travis-ci.org/PaymentHighway/paymenthighway-javascript-lib.svg?branch=master

