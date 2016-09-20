# Payment Highway JavaScript API Library

This is an example implementation of the communication with the Payment Highway API using JavaScript/TypeScript. 
The Form API and Payment API implement the basic functionality of the Payment Highway.

This code is provided as-is, use it as inspiration, reference or drop it directly into your own project and use it.

For full documentation on the PaymentHighway API visit our developer website: https://paymenthighway.fi/dev/

## Requirements
* Node.js >= 4.5.0

# Overview
Start with building the HTTP form parameters by using the FormParameterBuilder.

* `FormBuilder`

Create an instance of the builder, then use the generate methods to receive a list of parameters for each API call.

Initializing the builder

```javascript
var paymentHighway = require('paymenthighway-javascript-lib');

var method = 'POST';
var testKey = 'testKey';
var testSecret = 'testSecret';
var account = 'test';
var merchant = 'test_merchantId';
var serviceUrl = 'https://v1-hub-staging.sph-test-solinor.com';

var formBuilder = new paymentHighway.FormBuilder(method, testKey, testSecret, account, merchant, serviceUrl);
```

Example common parameters for the following form generation functions

```javascript
var successUrl = "https://example.com/success";
var failureUrl = "https://example.com/failure";
var cancelUrl = "https://example.com/cancel";
var language = "EN";
```
All form methods returns a FormContainer [(TS)](/ts/src/FormContainer.ts)[(JS)](/js/src/FormContainer.ts).
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
### GenerateAddCardParameters
```javascript
var formContainer = formBuilder.generateAddCardParameters(successUri, failureUri, cancelUri, language);
```

# Errors
Payment Highway authenticates each request and if there is invalid parameters or a signature mismatch, it returns an error.
PaymentHighwayAPI returns Promise from each requests.
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
