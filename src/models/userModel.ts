export interface User {
    readonly id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export const users: User[] = [];

