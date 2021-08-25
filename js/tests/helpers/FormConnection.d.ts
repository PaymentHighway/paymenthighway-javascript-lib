import { CancelableRequest, Response as GotResponse } from 'got';
import { FormContainer } from '../../src/FormContainer';
export declare class FormConnection {
    static postForm(container: FormContainer): CancelableRequest<GotResponse<string>>;
}
