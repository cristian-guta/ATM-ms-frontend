import { Subscription } from "rxjs";
import { AuthProvider } from "./authProvider";

export class ClientAudit{
    id?: number;
    rev?: number;
    revType?: number;
    revTypeString?: string;
    user?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    address?: string;
    email?: string;
    status?: boolean;
    roleId?: number;
    role?: string;
    roleName?: string;
    image?: number;
    authProvider?: AuthProvider;
    subscription?: Subscription;
    subscriptionId?: number;
    telephoneNumber?: string;
}