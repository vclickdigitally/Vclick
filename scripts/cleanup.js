import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// SECOND PASS: Delete deferred Vite files, routes, navigation, and legacy ESLint config
const pathsToDelete = [
  'prisma',
  'src/auth.ts',
  'src/auth',
  'src/app/admin',
  'src/app/api',
  'src/lib/db.ts',
  'src/lib/env.ts',
  'src/lib/seo-engine',
  'src/config/cms.ts',
  'src/constants/permissions.ts',
  'src/constants/roles.ts',
  'src/constants/seo.ts',
  'src/services/auth.ts',
  'src/middleware.ts',
  'src/features',
  'src/modules',
  'src/repositories',
  'src/types',
  'src/utils',
  'scripts/test-seo-engine.ts',
  
  // Deferred files (Stage 2)
  'src/App.tsx',
  'src/main.tsx',
  'vite.config.ts',
  'index.html',
  'src/config/navigation.ts',
  'src/constants/routes.ts',
  '.eslintrc.json',
  'src/lib/permissions.ts',
];

console.log('🧹 Starting cleanup process (Second Pass)...');

pathsToDelete.forEach((relativePath) => {
  const absolutePath = path.join(projectRoot, relativePath);
  if (fs.existsSync(absolutePath)) {
    try {
      const stats = fs.statSync(absolutePath);
      if (stats.isDirectory()) {
        fs.rmSync(absolutePath, { recursive: true, force: true });
        console.log(`🗑️ Deleted directory: ${relativePath}`);
      } else {
        fs.unlinkSync(absolutePath);
        console.log(`🗑️ Deleted file: ${relativePath}`);
      }
    } catch (error) {
      console.error(`❌ Failed to delete ${relativePath}:`, error.message);
    }
  } else {
    console.log(`ℹ️ Path not found (already deleted): ${relativePath}`);
  }
});

console.log('✅ Second Pass Cleanup completed!');
