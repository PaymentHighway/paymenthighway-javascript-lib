import {Response} from './Response';
import {Customer} from './Customer';
import {ProfileInfo} from './ProfileInfo';
import {CardResponse} from './CardResponse';
import {MasterpassInfo} from './MasterpassInfo';

export interface UserProfileResponse extends Response {
    profile: ProfileInfo;
    card: CardResponse;

    customer: Customer;
    cardholder_authentication: string;
    masterpass: MasterpassInfo;
}