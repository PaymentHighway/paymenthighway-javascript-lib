var assert = require('assert');
var PaymentAPI = require('../es5/PaymentAPI');

describe('PaymentAPI', function() {
    describe('API exists', function() {
        it('should have instance of PaymentHighwayAPI', function() {
            console.log(PaymentAPI);
            assert(api.initTransaction() == "foo", 'foooo');
        });
    });
});

