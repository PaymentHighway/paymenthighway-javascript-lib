import {Acquirer} from './Acquirer';

export interface AcquirerInfoResponse {
    acquirer?: Acquirer;
    acquirer_response_code?: string;
    authorizer?: string;
}