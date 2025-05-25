
export type IRegisterUser = {
    name: string;
    password: string;
    email: string;
    role?: "user" | "admin";
    createdAt?: Date;
}
export type ILoginUser = {
    email: string;
    password: string;
}

const USER_ROLE = {
    admin: 'admin',
    user: 'user'
  } as const;

export type TUserRole = keyof typeof USER_ROLE;