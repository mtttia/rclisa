import { defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

//set inptut in /src/index.html
export default defineConfig({
  plugins: [react({
    include:["**/*"]
  })],
  server: {
    port: 8125,
  },
  build: {
    outDir: 'build',
  },

  base: './',
  
})
