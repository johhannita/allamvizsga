export type AuthUser = {
    id: string
    firstName: string
    lastName: string
    email: string
    token: string
    role: ERole
    loaded: boolean
    isError?: boolean
}

export type Token = {
    token: string
}

export enum ERole {
    Undefined = -1,
    Admin,
    User,
}
