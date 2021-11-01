import { Benefit } from './benefit';
import { Currency } from './currency';

export class Subscription {
    id?: number;
    name?: string;
    price?: number;
    benefits?: Benefit[];
    benefitIds?: number[];
    subscriptionNetwork?: string;
    deleted?: boolean;
    currency?: Currency;
}
