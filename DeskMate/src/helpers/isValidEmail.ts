export function isValidEmail(email?: string): boolean {
    if (!email?.length) {
        return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}
