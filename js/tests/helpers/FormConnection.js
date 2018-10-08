"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestPromise = require("request-promise");
const __1 = require("../..");
class FormConnection {
    static postForm(container) {
        const options = {
            simple: false,
            resolveWithFullResponse: true,
            method: 'POST',
            uri: container.getAction(),
            form: container.nameValuePairs.reduce((prev, cur) => {
                prev[cur.first] = cur.second;
                return prev;
            }, {}),
            headers: {
                'User-Agent': __1.PaymentAPI.USER_AGENT
            }
        };
        return requestPromise(options);
    }
}
exports.FormConnection = FormConnection;
//# sourceMappingURL=FormConnection.js.map