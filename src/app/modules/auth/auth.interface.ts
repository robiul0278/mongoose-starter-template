
export type IRegisterUser = {
    name: string;
    password: string;
    email: string;
    role?: "user" | "admin";
    createdAt?: Date;
}
export type ILoginUser = {
    _id?: string;
    email: string;
    password: string;
    role?: "user" | "admin";
}

const USER_ROLE = {
    admin: 'admin',
    user: 'user'
  } as const;

export type TUserRole = keyof typeof USER_ROLE;