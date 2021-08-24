"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormConnection = void 0;
const got_1 = require("got");
const PaymentAPI_1 = require("../../src/PaymentAPI");
class FormConnection {
    static postForm(container) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
exports.FormConnection = FormConnection;
//# sourceMappingURL=FormConnection.js.map