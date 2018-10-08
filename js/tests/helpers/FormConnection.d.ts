/// <reference types="request-promise" />
import { RequestPromise } from 'request-promise';
import { FormContainer } from '../..';
export declare class FormConnection {
    static postForm(container: FormContainer): RequestPromise;
}
