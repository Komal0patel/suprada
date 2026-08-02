import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import https from 'https'

// Extract branding images from PDF & download curated spa images
try {
  const pdfPath = 'c:\\Supradha\\Refer_folder\\Suprada_Branding_231122_182733.pdf';
  const outputDir = 'c:\\Supradha\\public\\assets\\extracted';
  const spaDir = 'c:\\Supradha\\public\\assets\\spa';

  if (!fs.existsSync(spaDir)) {
    fs.mkdirSync(spaDir, { recursive: true });
  }

  const spaImages = {
    'shirodhara.jpg': 'https://images.unsplash.com/photo-1775133263714-848c8fe09e73?auto=format&fit=crop&w=2000&q=80',
    'katibasti.jpg': 'https://images.pexels.com/photos/38494113/pexels-photo-38494113/free-photo-of-traditional-ayurvedic-kati-basti-therapy-in-uttarakhand.jpeg?auto=compress&w=2000',
    'headmassage.jpg': 'https://images.pexels.com/photos/6187305/pexels-photo-6187305.jpeg?auto=compress&w=2000',
    'shouldermassage.jpg': 'https://images.pexels.com/photos/19695945/pexels-photo-19695945/free-photo-of-a-man-having-a-shoulders-massage.jpeg?auto=compress&w=2000',
    'outdoormassage.jpg': 'https://images.pexels.com/photos/37719540/pexels-photo-37719540/free-photo-of-relaxing-outdoor-massage-therapy-session.jpeg?auto=compress&w=2000',
    'mahabilva.jpg': 'https://supradawellness-v3.vercel.app/assets/mahabilva.jpg'
  };

  const downloadImage = (url, dest) => {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          downloadImage(res.headers.location, dest).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`Status: ${res.statusCode}`));
          return;
        }
        const fileStream = fs.createWriteStream(dest);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
      }).on('error', reject);
    });
  };

  // Download spa images if not present
  Object.entries(spaImages).forEach(async ([name, url]) => {
    const dest = path.join(spaDir, name);
    if (!fs.existsSync(dest)) {
      console.log(`[Vite Init] Downloading ${name}...`);
      try {
        await downloadImage(url, dest);
        console.log(`[Vite Init] Downloaded ${name}`);
      } catch (err) {
        console.error(`[Vite Init] Failed to download ${name}:`, err.message);
      }
    }
  });

  if (fs.existsSync(pdfPath)) {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const existing = fs.readdirSync(outputDir);
    if (existing.length === 0) {
      const buffer = fs.readFileSync(pdfPath);
      let index = 0;
      let count = 0;

      while (true) {
        const start = buffer.indexOf(Buffer.from([0xff, 0xd8, 0xff]), index);
        if (start === -1) break;

        const end = buffer.indexOf(Buffer.from([0xff, 0xd9]), start);
        if (end === -1) break;

        const jpegBuffer = buffer.subarray(start, end + 2);
        if (jpegBuffer.length > 30000) {
          fs.writeFileSync(path.join(outputDir, `extracted_${count}.jpg`), jpegBuffer);
          count++;
        }
        index = end + 2;
      }
      console.log(`[Vite Init] Carved ${count} images from branding PDF!`);
    }
  }
} catch (e) {
  console.error("Initialization scripts failed:", e);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    // SPA fallback: serve index.html for all unknown paths so React Router handles routing
    historyApiFallback: true,
  }
})