import {Method} from './util/Method';
import {Pair} from './util/Pair';

export class FormContainer {
    constructor(public method: Method,
                public baseUrl: string,
                public actionUrl: string,
                public nameValuePairs: Pair<string, string>[],
                public requestId: string) {
    }
}
