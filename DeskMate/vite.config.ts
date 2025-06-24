import react from "@vitejs/plugin-react"
import dns from "dns"
import { resolve } from "path"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"

dns.setDefaultResultOrder("verbatim")

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
            },
        },
    },
    plugins: [
        svgr({
            include: "**/*.svg?react",
        }),
        react(),
    ],
    resolve: {
        alias: {
            src: "/src",
        },
    },
    base: "/desk-mate",
})
