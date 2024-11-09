import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    build: {
    manifest: true,
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: "/src/main.tsx",
        account: "/src/account.tsx",
      },
    },
  },
})
