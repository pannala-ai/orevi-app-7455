const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Files to copy to dist
const filesToCopy = [
    'index.html',
    'styles.css',
    'script.js',
    'data.js',
    'router.js',
    'vercel.json'
];

// Copy main files
filesToCopy.forEach(file => {
    const source = path.join(__dirname, file);
    const dest = path.join(distDir, file);
    
    if (fs.existsSync(source)) {
        fs.copyFileSync(source, dest);
        console.log(`Copied: ${file}`);
    }
});

// Create pages directory in dist
const pagesDistDir = path.join(distDir, 'pages');
if (!fs.existsSync(pagesDistDir)) {
    fs.mkdirSync(pagesDistDir, { recursive: true });
}

// Copy all HTML files from pages directory
const pagesDir = path.join(__dirname, 'pages');
if (fs.existsSync(pagesDir)) {
    const pagesFiles = fs.readdirSync(pagesDir);
    pagesFiles.forEach(file => {
        const source = path.join(pagesDir, file);
        const dest = path.join(pagesDistDir, file);
        fs.copyFileSync(source, dest);
        console.log(`Copied: pages/${file}`);
    });
}

console.log('Build completed successfully!');