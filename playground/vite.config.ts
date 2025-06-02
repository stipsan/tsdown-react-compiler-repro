import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  root: './playground',
  plugins: [
    react({
      babel: { plugins: [['babel-plugin-react-compiler', { target: '18' }]] },
    }),
  ],
})
