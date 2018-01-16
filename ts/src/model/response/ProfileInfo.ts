import {DateOfBirth} from './DateOfBirth';
import {Address} from './Address';
import {ShippingAddress} from './ShippingAddress';

export interface ProfileInfo {
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    gender?: string;
    date_of_birth?: DateOfBirth;
    national_id?: string;
    country?: string;
    email_address?: string;
    phone_number?: string;
    billing_address?: Address;
    shipping_address?: ShippingAddress;
}