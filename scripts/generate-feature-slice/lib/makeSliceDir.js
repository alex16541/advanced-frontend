const fs = require('fs/promises');

async function makeSliceDir(dirPath) {
    try {
        await fs.mkdir(dirPath);
    } catch (e) {
        if (!e) return;

        if (e.code === 'EEXIST') {
            throw new Error('Этот слайс уже создан :)');
        }

        throw new Error(`Ошибка при создании дирректории: ${e.message}`);
    }
}

module.exports = makeSliceDir;
