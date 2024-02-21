const fs = require('node:fs/promises');

async function writeFile(path, text) {
    try {
        await fs.writeFile(path, text, { encoding: 'utf-8' });
    } catch (e) {
        throw new Error(`Ошибка при записи файла: ${e.message}`);
    }
}

module.exports = writeFile;
