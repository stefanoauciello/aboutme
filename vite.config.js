import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Plugin to resolve missing index.mjs in react-icons/lib
const reactIconsPatchPlugin = () => ({
    name: 'react-icons-patch',
    resolveId(source, importer) {
        if (importer && importer.includes('react-icons') && (source === '../lib/index.mjs' || source.endsWith('/lib/index.mjs'))) {
            return path.resolve(__dirname, 'src/shims/react-icons-lib.mjs');
        }
        return null;
    }
});

export default defineConfig({
    plugins: [react(), reactIconsPatchPlugin()],
    base: "/aboutme/",
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router-dom/')) {
                        return 'react-vendor';
                    }
                    if (id.includes('node_modules/framer-motion/')) {
                        return 'framer-motion';
                    }
                }
            }
        }
    }
});
