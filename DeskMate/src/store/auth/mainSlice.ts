import { AuthUser, ERole } from "src/models/auth"
import { StateCreator } from "zustand"
import { AuthStoreSlice, AuthStoreState } from "./model"

const initialState: AuthStoreState = {
    auth: {
        firstName: "",
        lastName: "",
        email: "",
        role: ERole.Undefined,
        token: "",
        loaded: false,
        isError: undefined,
        id: "",
    },
    isUnauthorized: false,
    selectedRole: ERole.Undefined,
}

export const createAuthStoreSlice: StateCreator<AuthStoreSlice> = (set) => ({
    ...initialState,
    authStoreActions: {
        setToken: (token: string) => set((state) => setToken(state, token)),
        setUser: (auth: AuthUser) => set((state) => setUser(state, auth)),
        setUserLoaded: () => set((state) => setUserLoaded(state)),
        setIsError: () => set((state) => setIsError(state)),
        setIsUnauthorized: () => set((state) => setIsUnauthorized(state)),
        setSelectedRole: (newRole: ERole) => set((state) => setSelectedRole(state, newRole)),
    },
})

function setToken(state: AuthStoreSlice, token: string): AuthStoreSlice {
    return {
        ...state,
        auth: {
            ...state.auth,
            token,
        },
        isUnauthorized: false,
    }
}
function setUser(state: AuthStoreSlice, auth: AuthUser): AuthStoreSlice {
    return {
        ...state,
        auth,
        selectedRole: auth.role,
    }
}
function setUserLoaded(state: AuthStoreSlice): AuthStoreSlice {
    return {
        ...state,
        auth: {
            ...state.auth,
            loaded: true,
        },
    }
}

function setIsError(state: AuthStoreSlice): AuthStoreSlice {
    return {
        ...state,
        auth: {
            ...state.auth,
            isError: false,
        },
    }
}

function setIsUnauthorized(state: AuthStoreSlice): AuthStoreSlice {
    return {
        ...state,
        isUnauthorized: !state.isUnauthorized,
    }
}

function setSelectedRole(state: AuthStoreSlice, newRole: ERole): AuthStoreSlice {
    return {
        ...state,
        selectedRole: newRole,
    }
}
