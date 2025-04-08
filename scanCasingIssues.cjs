const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src');

const pascalCase = /^[A-Z][A-Za-z0-9]+\.tsx?$/;
const camelOrKebabCaseFolder = /^([a-z][a-zA-Z0-9]*|[a-z0-9]+(-[a-z0-9]+)*)$/;

function scan(dir) {
  const entries = fs.readdirSync(dir);
  for (let entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // ❌ Check folder casing
      const folderName = path.basename(fullPath);
      if (!camelOrKebabCaseFolder.test(folderName)) {
        console.log(`🚨 Folder casing issue: ${fullPath}`);
      }

      scan(fullPath); // Recursively check children
    } else {
      const ext = path.extname(entry);
      if (['.ts', '.tsx'].includes(ext)) {
        const fileName = path.basename(entry);

        // Gợi ý casing cho component
        if (fileName.endsWith('.tsx') && !pascalCase.test(fileName)) {
          console.log(`⚠️  Component file might need PascalCase: ${fullPath}`);
        }
      }
    }
  }
}

console.log('📁 Scanning casing issues in src/...\n');
scan(srcPath);
