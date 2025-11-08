#!/usr/bin/env node
// Convert .tex files in public/posts to HTML using pandoc (called from CI/build).
// Generates: public/posts_html/<name>.html and public/posts.json metadata

const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const POSTS_DIR = path.join(process.cwd(), 'public', 'posts');
const OUT_DIR = path.join(process.cwd(), 'public', 'posts_html');

if (!fs.existsSync(POSTS_DIR)) {
  console.log('No posts directory found:', POSTS_DIR);
  process.exit(0);
}
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, {recursive: true});

const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.tex'));
const meta = [];

files.forEach(file => {
  const src = path.join(POSTS_DIR, file);
  const name = path.basename(file, '.tex');
  const outFile = path.join(OUT_DIR, `${name}.html`);
  try {
    console.log('Converting', file, '->', outFile);
    // Pandoc command: convert to standalone HTML with basic css
    execSync(`pandoc "${src}" -s -o "${outFile}" --standalone`, {stdio: 'inherit'});

    // Extract title from the generated HTML or fallback to filename
    let html = fs.readFileSync(outFile, 'utf8');
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : name;
    // Extract first paragraph as excerpt
    const pMatch = html.match(/<p>([\s\S]{0,300}?)<\/p>/i);
    const excerpt = pMatch ? pMatch[1].replace(/\s+/g, ' ').slice(0, 300) : '';

    meta.push({ filename: file, name, title, excerpt, htmlPath: `/posts_html/${name}.html` });
  } catch (err) {
    console.error('Failed to convert', file, err.message);
  }
});

fs.writeFileSync(path.join(process.cwd(), 'public', 'posts.json'), JSON.stringify(meta, null, 2));
console.log('Wrote public/posts.json with', meta.length, 'items');
