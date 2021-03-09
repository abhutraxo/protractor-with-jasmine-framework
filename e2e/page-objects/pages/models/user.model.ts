export interface User {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    userType?: UserType;
}

export enum UserType {
    ADMIN, CUSTOMER, MANAGER, CANDIDATE,
}
