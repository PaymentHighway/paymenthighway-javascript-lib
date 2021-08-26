"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormConnection = void 0;
const got_1 = require("got");
const PaymentAPI_1 = require("../../src/PaymentAPI");
class FormConnection {
    static postForm(container) {
        let method = 'POST';
        const options = {
            method: method,
            url: container.getAction(),
            followRedirect: false,
            form: container.nameValuePairs.reduce((prev, cur) => {
                prev[cur.first] = cur.second;
                return prev;
            }, {}),
            headers: {
                'User-Agent': PaymentAPI_1.PaymentAPI.USER_AGENT
            },
            timeout: {
                request: 30000
            }
        };
        return got_1.default(options);
    }
}
exports.FormConnection = FormConnection;
//# sourceMappingURL=FormConnection.js.map