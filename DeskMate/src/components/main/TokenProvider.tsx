import { getUserFromLocalStorage } from "src/helpers/sessionStorage"
import { authStoreActions, useDeskMateStore } from "src/store"
import { Login } from "./Login"
import { Main } from "./Main"

export function TokenProvider() {
    const { auth } = useDeskMateStore()
    const userFromStorage = getUserFromLocalStorage()
    if (!auth.loaded && userFromStorage) {
        authStoreActions.setUser(userFromStorage)
        authStoreActions.setUserLoaded()
    }
    return auth.loaded ? <Main /> : <Login />
}
