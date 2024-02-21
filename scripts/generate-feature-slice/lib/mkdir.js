const fs = require('fs/promises');

async function mkdir(path) {
    try {
        await fs.mkdir(path);
    } catch (e) {
        if (e) throw new Error(`Ошибка создания дирректории: ${e.message}`);
    }
}

module.exports = mkdir;
