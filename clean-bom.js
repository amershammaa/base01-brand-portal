const fs = require('fs');
const files = ['src/index.css', 'src/App.jsx', 'vite.config.js'];

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        if (content.charCodeAt(0) === 0xFEFF) {
            content = content.slice(1);
        }
        // Also strip out any other weird prefix characters like Â or other hidden chars
        content = content.replace(/^[^a-zA-Z0-9@/]*(@import|import)/, '$1');
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Cleaned ${file}`);
    } catch (err) {
        console.error(`Error with ${file}:`, err.message);
    }
});
