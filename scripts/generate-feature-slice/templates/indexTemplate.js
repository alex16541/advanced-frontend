function indexTemplate(featureName) {
    return `export { ${featureName} } from './ui/${featureName}';
`;
}

module.exports = indexTemplate;
