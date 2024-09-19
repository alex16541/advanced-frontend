import { CallExpression, JsxSelfClosingElement, Node, Project, SyntaxKind } from 'ts-morph';

const featureToRemove = process.argv[2];
const featureState = process.argv[3];

if (!featureToRemove) {
    throw new Error('Не указано название фичи.');
}

if (!featureState) {
    throw new Error('Не указано сотояние фичи, которое нужно оставить. Доступные варианты: [on, off]');
}

if (featureState !== 'on' && featureState !== 'off') {
    throw new Error('Указано неверное состояние фичи. Доступные варианты: [on, off]');
}

const project = new Project();

project.addSourceFilesAtPaths(['src/**/*.ts', 'src/**/*.tsx']);
// project.addSourceFilesAtPaths(['src/pages/ArticleDetailsPage/ui/ArticleDetailsPage/ArticleDetailsPage.tsx']);
// project.addSourceFilesAtPaths(['src/entity/Country/ui/CountrySelect.tsx']);

const removeFeatureToggleFunction = (node: CallExpression) => {
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
};

const getAttribute = (node: Node, atrName: string) => {
    const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

    return attributes.find((atr) => atr.getText().split('=')[0] === atrName);
};

const removeFeatureToggleComponent = (node: JsxSelfClosingElement) => {
    try {
        const componentName = node.getFirstDescendantByKind(SyntaxKind.Identifier)?.getText();
        if (componentName !== 'FeatureToggle') return;

        const attributes = node.getFirstDescendantByKind(SyntaxKind.JsxAttributes);
        if (!attributes) return;

        const nameProp = getAttribute(attributes, 'feature');
        if (!nameProp) return;

        const name = nameProp.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getText().slice(1, -1);
        if (name !== featureToRemove) return;

        const onProp = getAttribute(attributes, 'on');
        const offProp = getAttribute(attributes, 'off');

        const on = onProp?.getFirstDescendantByKind(SyntaxKind.JsxExpression)?.getText();
        const off = offProp?.getFirstDescendantByKind(SyntaxKind.JsxExpression)?.getText();

        const isOn = featureState === 'on';

        let res = (isOn ? on : off) ?? '';

        if (res[0] === '{' && res[res.length - 1] === '}') res = res?.slice(1, -1);

        node.replaceWithText(res ?? '');
    } catch (e) {
        // console.log(e);
    }
};

const files = project.getSourceFiles();

files.forEach((file) => {
    const callExpressionNodes = file.getDescendantsOfKind(SyntaxKind.CallExpression);

    callExpressionNodes.forEach((node) => removeFeatureToggleFunction(node));

    const jsxNodes = file.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement);

    jsxNodes.forEach((node) => removeFeatureToggleComponent(node));
});

project.save();
