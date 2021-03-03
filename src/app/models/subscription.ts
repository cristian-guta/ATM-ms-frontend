import { Benefit } from './benefit';

export class Subscription {
    id?: number;
    name?: string;
    price?: number;
    benefits?: Benefit[];
    benefitIds?: number[];
    deleted?: boolean;
}
