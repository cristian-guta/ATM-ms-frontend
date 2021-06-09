import { Subscription } from './subscription';

export class Benefit {
    id?: number;
    description: string;
    subscriptions?: Subscription[];
}
