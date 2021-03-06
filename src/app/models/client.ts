import { AuthProvider } from './authProvider';
import { Subscription } from './subscription';


export class Client {
    id?: number;
    password?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    confirmPassword?: string;
    email?: string;
    cnp?: string;
    address?: string;
    // deactivate?: boolean;
    status?: boolean;
    roleId?: number;
    role?: string;
    roleName?: string;
    authProvider?: AuthProvider
    subscription?: Subscription;
    subscriptionId?: number;
    deleting?: boolean;
    activationDate?: Date;
    telephoneNumber?: string;
}
