import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';
import { defineNuxtModule } from 'nuxt/kit';

export default defineNuxtModule({
  setup(_, nuxt) {
    const stableEndpoints = [
        { path: '/majske-igre/organizational-team', filename: 'organizational-team.json' },
    ];

    nuxt.hook('nitro:build:public-assets', async (nitro) => {
        // We use the nitro.options.output.publicDir for the correct output path
        const publicDir = resolve(nitro.options.output.publicDir);
        
        // This import now works because it runs in the proper module context
        const { serverQueryContent } = await import('#content/server');
        
        const mockEvent = {};

        for (const endpoint of stableEndpoints) {
            const data = await serverQueryContent(mockEvent)
                .where({ _path: endpoint.path })
                .findOne();
            
            const outputPath = resolve(publicDir, endpoint.filename);

            await fs.writeFile(outputPath, JSON.stringify(data, null, 2), 'utf-8');
            console.log(`[Static Content] Exported stable file: ${endpoint.filename}`);
        }
    });
  }
});