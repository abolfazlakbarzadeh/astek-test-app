import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
            'validation': path.resolve(__dirname, '../../packages/validation'),
        },
    },
});
