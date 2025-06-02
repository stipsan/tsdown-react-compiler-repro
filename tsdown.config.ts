import react from '@vitejs/plugin-react'
import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: ['./src/index.ts'],
    platform: 'neutral',
    dts: true,
    sourcemap: true,
    plugins: [
      react({
        babel: { plugins: [['babel-plugin-react-compiler', { target: '18' }]] },
      }),
    ],
  },
])
