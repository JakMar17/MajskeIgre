import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';

const stableEndpoints = [
    { path: '/majske-igre/organizational-team', filename: 'organizational-team.json' },
];

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        "@/assets/styles/main.scss",
        "@/node_modules/remixicon/fonts/remixicon.css"
    ],
    build: {
        transpile: [],
    },
    vite: {
        define: {
            'process.env.DEBUG': true,
        },
        server: {
            hmr: {
                port: 3008
            }
        },
        css: {
            preprocessorOptions: {
                scss: {}
            }
        }

    },
    plugins: [
    ],
    modules: [
        '@nuxt/content',
        'v-plausible'
    ],
    experimental: {
        payloadExtraction: false
    },
    runtimeConfig: {
        public: {
            gtagId: "G-QLS16E0KC9"
        }
    },
    plausible: {
        init: {
            domain: 'majske-igre.si',
            apiHost: 'https://plausible.sven.marela.team/',
            trackLocalhost: false
        },
        partytown: false,
    },
    hooks: {
        'nitro:build:public-assets': async (nitro) => {
            const publicDir = resolve(nitro.options.output.publicDir);
            
            const { serverQueryContent } = await import('node_modules/@nuxt/content/dist/runtime/server');
            
            const mockEvent = {};

            for (const endpoint of stableEndpoints) {
                const data = await serverQueryContent(mockEvent)
                    .where({ _path: endpoint.path })
                    .findOne();
                
                const outputPath = resolve(publicDir, endpoint.filename);

                await fs.writeFile(outputPath, JSON.stringify(data, null, 2), 'utf-8');
            }
        }
    }
})
