
export type IUser = {
    name: string;
    password: string;
    email: string;
    photoURL?: string;
    role?: "user" | "admin";
    createdAt?: Date;
}



