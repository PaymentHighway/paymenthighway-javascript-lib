import {Response} from './Response';
import {Settlement} from './Settlement';

export interface ReportResponse extends Response {
    settlements: Settlement[];
}
