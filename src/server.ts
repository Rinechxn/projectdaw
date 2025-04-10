import express from 'express';
import { join } from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const port = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

async function startServer() {
  let vite: any;

  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(join(process.cwd(), 'dist')));
  }

  // Main route
  app.get('/', async (req, res) => {
    try {
      if (isProd) {
        res.sendFile(join(process.cwd(), 'dist', 'index.html'));
      } else {
        let html = await vite.transformIndexHtml(
          req.url,
          await vite.ssrLoadModule(join(process.cwd(), 'src/renderer/index.html'))
        );
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      }
    } catch (e: any) {
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  // Mixer route
  app.get('/mixer', async (req, res) => {
    try {
      if (isProd) {
        res.sendFile(join(process.cwd(), 'dist', 'mixer.html'));
      } else {
        let html = await vite.transformIndexHtml(
          req.url,
          await vite.ssrLoadModule(join(process.cwd(), 'src/renderer/mixer/index.html'))
        );
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      }
    } catch (e: any) {
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
