/// <reference types="vitest" />
import { mergeConfig } from 'vite'
import { baseConfig } from './vite.config'

export default mergeConfig(
    baseConfig,
    {
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: ['./vitest.setup.ts'],
        },
    }
)