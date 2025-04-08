import fs from 'fs/promises';
import path from 'path';

const projectRoot = './src/components';

function isPascalCase(str) {
  return /^[A-Z][a-zA-Z0-9]*\.tsx$/.test(str);
}

function toPascalCase(filename) {
  const base = path.basename(filename, '.tsx');
  return (
    base
      .split(/[_-]/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join('') + '.tsx'
  );
}

function toCamelCase(name) {
  return name
    .split(/[_-]/)
    .map((part, index) =>
      index === 0
        ? part.toLowerCase()
        : part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join('');
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(projectRoot, fullPath);

    if (entry.isDirectory()) {
      const camelCased = toCamelCase(entry.name);
      if (entry.name !== camelCased) {
        const newPath = path.join(dir, camelCased);
        console.log(`📁 Rename folder: ${relativePath} → ${path.relative(projectRoot, newPath)}`);
        await fs.rename(fullPath, newPath);
        await walk(newPath);
      } else {
        await walk(fullPath);
      }
    } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
      if (!isPascalCase(entry.name)) {
        const newName = toPascalCase(entry.name);
        const newPath = path.join(dir, newName);
        console.log(`📄 Rename file: ${relativePath} → ${path.relative(projectRoot, newPath)}`);
        await fs.rename(fullPath, newPath);
      }
    }
  }
}

walk(projectRoot)
  .then(() => console.log('\n✅ Done! Remember to fix your import paths!'))
  .catch((err) => console.error('❌ Error:', err));
