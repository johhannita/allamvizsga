import { AuthUser, ERole } from "src/models/auth"

export type AuthStoreSlice = AuthStoreAction & AuthStoreState

export type AuthStoreAction = {
    authStoreActions: {
        setToken: (token: string) => void
        setUser: (user: AuthUser) => void
        setUserLoaded: () => void
        setIsError: () => void
        setIsUnauthorized: () => void
        setSelectedRole: (newRole: ERole) => void
    }
}

export type AuthStoreState = {
    auth: AuthUser
    isUnauthorized: boolean
    selectedRole: ERole
}
