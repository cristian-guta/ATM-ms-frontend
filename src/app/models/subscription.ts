import { Benefit } from './benefit';

export class Subscription {
    id?: number;
    name?: string;
    price?: number;
    benefits?: Benefit[];
    benefitIds?: number[];
    subscriptionNetwork?: string;
    deleted?: boolean;
}
