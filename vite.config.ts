import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// @ts-ignore
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
// @ts-ignore
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import path from 'path'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
	plugins: [
		tanstackRouter({
			target: 'react',
			autoCodeSplitting: true
		}),
		react(),
		tailwindcss(),
		tsconfigPaths(),
		svgr()
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.json', '.jpg', '.svg'],
		alias: {
			'~': path.resolve(__dirname, 'src'),
			'~app': path.resolve(__dirname, 'src/app'),
			'~shared': path.resolve(__dirname, 'src/shared'),
			'~types': path.resolve(__dirname, 'src/@types'),
			'~pages': path.resolve(__dirname, 'src/pages'),
			'~widgets': path.resolve(__dirname, 'src/widgets'),
			'~features': path.resolve(__dirname, 'src/features')
		}
	}
})
