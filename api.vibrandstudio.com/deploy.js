const fs = require('fs');
const path = require('path');

//const itemsToCopy = ['package.json', 'package-lock.json', '.env', 'prisma', 'uploads'];
const itemsToCopy = ['package.json', 'package-lock.json', 'prisma', 'uploads'];
const destDir = path.join(__dirname, 'dist');

// Ensure dist exists
if (!fs.existsSync(destDir)) {
  console.error('❌ dist folder not found. Run "npm run build" first.');
  process.exit(1);
}

// Recursive copy for folders
function copyRecursiveSync(src, dest) {
  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    fs.readdirSync(src).forEach((child) => {
      copyRecursiveSync(path.join(src, child), path.join(dest, child));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

itemsToCopy.forEach((item) => {
  const src = path.join(__dirname, item);
  const dest = path.join(destDir, item);

  try {
    if (!fs.existsSync(src)) {
      console.warn(`⚠️ Skipped missing item: ${item}`);
      return;
    }

    if (item === 'package.json') {
      const pkg = JSON.parse(fs.readFileSync(src, 'utf-8'));

      // Update start:prod
      if (pkg.scripts && pkg.scripts['start:prod']) {
        pkg.scripts['start:prod'] = 'node main';
        console.log('✏️  Updated start:prod in package.json for dist deployment');
      }

      // Remove devDependencies
      if (pkg.devDependencies) {
        delete pkg.devDependencies;
        console.log('🗑️  Removed devDependencies for dist deployment');
      }

      fs.writeFileSync(dest, JSON.stringify(pkg, null, 2));
      console.log(`✅ Copied modified ${item} → dist/`);
    } else {
      copyRecursiveSync(src, dest);
      console.log(`✅ Copied ${item} → dist/`);
    }

  } catch (err) {
    console.error(`❌ Error copying ${item}:`, err);
  }
});

console.log('\n🚀 Deploy folder ready in dist/');
