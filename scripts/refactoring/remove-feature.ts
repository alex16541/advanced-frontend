import { Project, SyntaxKind } from 'ts-morph';

const featureToRemove = process.argv[2];
const featureState = process.argv[3];

if (!featureToRemove) {
    throw new Error('Не указано название фичи.');
}

if (!featureState) {
    throw new Error('Не указано сотояние фичи.');
}

if (featureState !== 'on' && featureState !== 'off') {
    throw new Error('Указано неверное состояние фичи. Доступные варианты: [on, off]');
}

const project = new Project();

project.addSourceFilesAtPaths(['../../src/**/*.ts', '../../src/**/*.tsx']);

const files = project.getSourceFiles();

files.forEach((file) => {
    const callExpressionNodes = file.getDescendantsOfKind(SyntaxKind.CallExpression);

    callExpressionNodes.forEach((node) => {
        if (node.getExpression().getText() !== 'featureToggle') return;

        const obj = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);

        if (!obj) return;

        const nameProperty = obj.getProperty('name');
        const name = nameProperty?.getChildAtIndex(2).getText().slice(1, -1);

        if (name !== featureToRemove) return;

        const onProperty = obj.getProperty('on');
        const offProperty = obj.getProperty('off');

        const on = onProperty?.getChildAtIndex(2).asKind(SyntaxKind.ArrowFunction)?.getBody().getText();
        const off = offProperty?.getChildAtIndex(2).asKind(SyntaxKind.ArrowFunction)?.getBody().getText();

        const isOn = featureState === 'on';

        node.replaceWithText((isOn ? on : off) ?? '');
    });
});

project.save();
