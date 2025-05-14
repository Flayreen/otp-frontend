import { fileURLToPath, URL } from 'node:url'
import * as fs from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
   server: {
     port: 443,
    //  https: {
    //   key: fs.readFileSync('./cert/privatekey.key'),
    //   cert: fs.readFileSync('./cert/otpdayz_store.crt'),
    //   ca: fs.readFileSync('./cert/otpdayz_store.ca-bundle')
    // }
   }
})
