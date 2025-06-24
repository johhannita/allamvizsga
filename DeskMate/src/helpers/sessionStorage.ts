import { AuthUser } from "src/models/auth"
import { verifyToken } from "./verifyToken"

export function setLanguageIdToSessionStorage(languageId: string): void {
    sessionStorage.setItem("languageId", languageId)
}

export function getLanguageIdFromSessionStorage(): string | null {
    return sessionStorage.getItem("languageId")
}

export function setUserToLocalStorage(user: AuthUser): void {
    localStorage.setItem("user", JSON.stringify(user))
}

export function getUserFromLocalStorage(): AuthUser | null {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
        return null
    }

    const user = JSON.parse(storedUser) as AuthUser
    if (verifyToken(user.token)) {
        return user
    }

    return null
}

export function removeUserFromLocalStorage(): void {
    localStorage.removeItem("user")
}
