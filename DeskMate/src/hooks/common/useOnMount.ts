import { useEffect, useRef } from "react"

export const useOnMount = (callback: () => void, destroyCallback?: () => void) => {
    const mounted = useRef(false)

    useEffect(() => {
        if (mounted.current) {
            return
        }
        callback()
        mounted.current = true

        return () => {
            destroyCallback?.()
        }
    }, [])
}
