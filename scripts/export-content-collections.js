// scripts/export-content-collections.js
// Run with: node scripts/export-content-collections.js
// For each folder in content/, export a collection JSON file in public/api/_content/[folder].json

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(__dirname, '../content');
const OUTPUT_DIR = path.join(__dirname, '../public/content');

function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function slugify(filePath) {
  // Remove extension, replace backslashes, ensure leading slash
  return '/' + filePath.replace(/\\/g, '/').replace(/\.(md|json)$/, '');
}

function parseContentFile(filePath, relPath) {
  if (filePath.endsWith('.md')) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    return {
      _id: slugify(relPath),
      _path: slugify(relPath),
      _draft: false,
      ...parsed.data,
      body: parsed.content
    };
  } else if (filePath.endsWith('.json')) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    return {
      _id: slugify(relPath),
      _path: slugify(relPath),
      _draft: false,
      ...data
    };
  }
  return null;
}

function exportCollections() {
  ensureDirSync(OUTPUT_DIR);
  const collections = fs.readdirSync(CONTENT_DIR).filter(f => fs.statSync(path.join(CONTENT_DIR, f)).isDirectory());
  collections.forEach(collection => {
    const collectionDir = path.join(CONTENT_DIR, collection);
    const files = fs.readdirSync(collectionDir).filter(f => f.endsWith('.md') || f.endsWith('.json'));
    const items = files.map(file => {
      const relPath = path.join(collection, file);
      return parseContentFile(path.join(collectionDir, file), relPath);
    }).filter(Boolean);
    const outPath = path.join(OUTPUT_DIR, `${collection}.json`);
    fs.writeFileSync(outPath, JSON.stringify(items, null, 2));
    console.log(`Exported ${items.length} items to ${outPath}`);
  });
}

exportCollections();
