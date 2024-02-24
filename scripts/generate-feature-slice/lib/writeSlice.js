const mkdir = require('./mkdir');
const writeFile = require('./writeFile');
const componentTemplate = require('../templates/componentTemplate');
const stylesTemplate = require('../templates/stylesTemplate');
const storiesTemplate = require('../templates/storiesTemplate');
const indexTemplate = require('../templates/indexTemplate');

async function writeSlice(featurePath, featureName, sliceName) {
    await mkdir(`${featurePath}/ui`);
    await mkdir(`${featurePath}/model`);
    await mkdir(`${featurePath}/model/selectors`);
    await mkdir(`${featurePath}/model/services`);
    await mkdir(`${featurePath}/model/slices`);
    await mkdir(`${featurePath}/model/types`);
    await writeFile(`${featurePath}/ui/${featureName}.tsx`, componentTemplate(featureName));
    await writeFile(`${featurePath}/ui/${featureName}.module.scss`, stylesTemplate(featureName));
    await writeFile(`${featurePath}/ui/${featureName}.stories.tsx`, storiesTemplate(featureName));
    await writeFile(`${featurePath}/index.ts`, indexTemplate(featureName));
}

module.exports = writeSlice;
