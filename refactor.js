import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
  'src/pages/Home.tsx',
  'src/pages/Login.tsx',
  'src/pages/Registration.tsx',
  'src/pages/FindBlood.tsx',
  'src/pages/Impact.tsx',
  'src/pages/About.tsx'
];

const replacements = [
  // Compound replacements first
  { search: /bg-white dark:bg-gray-9[05]0/g, replace: 'bg-bg-surface' },
  { search: /bg-gray-50 dark:bg-gray-9[05]0\/?[0-9]*/g, replace: 'bg-bg-subtle' },
  { search: /bg-gray-100 dark:bg-gray-800/g, replace: 'bg-bg-subtle' },
  
  { search: /text-gray-900 dark:text-white/g, replace: 'text-text-base' },
  { search: /dark:text-white text-gray-900/g, replace: 'text-text-base' },
  { search: /text-gray-900 dark:text-gray-100/g, replace: 'text-text-base' },
  { search: /text-gray-800 dark:text-gray-100/g, replace: 'text-text-base' },
  
  { search: /text-gray-600 dark:text-gray-300/g, replace: 'text-text-muted' },
  { search: /text-gray-500 dark:text-gray-400/g, replace: 'text-text-muted' },
  { search: /text-gray-400 dark:text-gray-500/g, replace: 'text-text-muted' },
  { search: /text-gray-400 dark:text-gray-600/g, replace: 'text-text-muted' },
  
  { search: /border-gray-100 dark:border-gray-800/g, replace: 'border-border-subtle' },
  { search: /border-gray-200 dark:border-gray-800/g, replace: 'border-border-strong' },
  { search: /border-gray-200 dark:border-gray-700/g, replace: 'border-border-strong' },

  // Single replacements
  { search: /bg-white/g, replace: 'bg-bg-surface' },
  { search: /bg-gray-50/g, replace: 'bg-bg-subtle' },
  { search: /bg-gray-100/g, replace: 'bg-bg-subtle' },
  
  { search: /text-gray-900/g, replace: 'text-text-base' },
  { search: /text-gray-800/g, replace: 'text-text-base' },
  { search: /text-gray-700/g, replace: 'text-text-base' },
  { search: /text-gray-600/g, replace: 'text-text-muted' },
  { search: /text-gray-500/g, replace: 'text-text-muted' },
  { search: /text-gray-400/g, replace: 'text-text-muted' },
  
  { search: /border-gray-100/g, replace: 'border-border-subtle' },
  { search: /border-gray-200/g, replace: 'border-border-strong' },
  { search: /border-gray-300/g, replace: 'border-border-strong' },
  
  // Cleanup leftover dark classes
  { search: /dark:bg-gray-950/g, replace: '' },
  { search: /dark:bg-gray-900/g, replace: '' },
  { search: /dark:bg-gray-800/g, replace: '' },
  { search: /dark:bg-gray-700/g, replace: '' },
  { search: /dark:bg-transparent/g, replace: '' },
  
  { search: /dark:text-white/g, replace: '' },
  { search: /dark:text-gray-100/g, replace: '' },
  { search: /dark:text-gray-200/g, replace: '' },
  { search: /dark:text-gray-300/g, replace: '' },
  { search: /dark:text-gray-400/g, replace: '' },
  { search: /dark:text-gray-500/g, replace: '' },
  { search: /dark:text-gray-600/g, replace: '' },
  { search: /dark:text-gray-700/g, replace: '' },
  
  { search: /dark:border-gray-800/g, replace: '' },
  { search: /dark:border-gray-700/g, replace: '' },
  
  { search: /dark:hover:text-white/g, replace: 'hover:text-text-base' },
  { search: /dark:hover:text-gray-100/g, replace: 'hover:text-text-base' },
  { search: /dark:hover:text-gray-200/g, replace: 'hover:text-text-base' },
  { search: /dark:hover:text-gray-300/g, replace: 'hover:text-text-base' },
  { search: /dark:hover:bg-gray-900/g, replace: 'hover:bg-bg-subtle' },
  { search: /dark:hover:bg-gray-800/g, replace: 'hover:bg-bg-subtle' },
  { search: /dark:hover:bg-gray-700/g, replace: 'hover:bg-bg-subtle' },
  
  { search: /dark:shadow-none/g, replace: '' }
];

files.forEach(file => {
  const filepath = path.join(__dirname, file);
  if (fs.existsSync(filepath)) {
    let content = fs.readFileSync(filepath, 'utf8');
    replacements.forEach(({search, replace}) => {
      content = content.replace(search, replace);
    });
    // Remove multiple spaces left by replacing with empty string
    content = content.replace(/ +/g, ' ');
    fs.writeFileSync(filepath, content);
    console.log(`Processed ${file}`);
  }
});
