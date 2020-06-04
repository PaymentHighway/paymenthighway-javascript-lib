import { Method } from './util/Method';
import { Pair } from './util/Pair';
export declare class FormContainer {
    method: Method;
    baseUrl: string;
    actionUrl: string;
    nameValuePairs: Pair<string, string>[];
    requestId: string;
    constructor(method: Method, baseUrl: string, actionUrl: string, nameValuePairs: Pair<string, string>[], requestId: string);
    getAction(): string;
}
