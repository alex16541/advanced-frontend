function indexTemplate(featureName) {
    return `export * from './ui/${featureName}';
`;
}

module.exports = indexTemplate;
