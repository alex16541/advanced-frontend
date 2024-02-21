const path = require('node:path');

const makeSliceDir = require('./lib/makeSliceDir');
const getSlicesNames = require('./lib/getSlicesNames');
const writeSlice = require('./lib/writeSlice');

const slices = {
    entity: {},
    features: {},
    pages: {},
    widgets: {},
    shared: {},
};

function runChecks(slice, featureName) {
    if (!slice) {
        throw new Error(`Не указан слайс: ${getSlicesNames()}`);
    }

    if (!slices[slice]) {
        throw new Error(`Слайс указан неверно. Доступные слайсы: ${getSlicesNames()}`);
    }

    if (!featureName) {
        throw new Error('Не указано название фичи');
    }
}

async function generateSlice() {
    const [_, dirPath, slice, featureName] = process.argv;

    runChecks(slice, featureName);

    const srcPath = path.resolve(dirPath, '..', '..', '..', 'src');
    let featurePath = '';

    if (slice === 'shared') {
        featurePath = path.resolve(srcPath, slice, 'ui', featureName);
    } else {
        featurePath = path.resolve(srcPath, slice, featureName);
    }

    await makeSliceDir(featurePath);
    await writeSlice(featurePath, featureName, slice);
}

generateSlice();
