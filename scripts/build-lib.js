import { resolve } from 'node:path'
import { fileURLToPath } from 'url'
import { build } from 'vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

;(async () => {
    await build({
        build: {
            lib: {
                entry: resolve(__dirname, '../src/components/index.js'),
                fileName: 'vue-editor',
                formats: ['es', 'cjs']
            },
            outDir: resolve(__dirname, '../dist')
        },
        optimizeDeps: {
            exclude: ['vue-demi']
        }
    })

    process.exit()
})()


