import path from 'path';

import { Project } from 'ts-morph';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.md');
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// slice : entities, features, pages, widgets

const sliceMap: Record<string, string> = {
    pages: 'Page',
    entity: 'Entity',
    features: 'Feature',
    widgets: 'Widget',
};

const createReadmeForSlice = (slice: string) => {
    if (!Object.keys(sliceMap).includes(slice)) {
        return;
    }

    const slicePaths = path.resolve(__dirname, '..', 'src', `${slice}`);
    const sliceDirectory = project.getDirectory(slicePaths);
    const componentsDirectories = sliceDirectory?.getDirectories();

    componentsDirectories?.forEach((directory) => {
        const readmeFilePath = `${directory.getPath()}/README.md`;
        const readmeFile = directory.getSourceFile((f) => f.getBaseName() === 'README.md');
        if (!readmeFile) {
            try {
                const sourceCode = `## ${sliceMap[slice]} ${directory.getBaseName()} - ...`;
                const file = directory.createSourceFile(readmeFilePath, sourceCode);
                file.save();
            } catch (e) {
                console.log('Ошибка создания файла');
            }
        }
    });
};

createReadmeForSlice('features');
createReadmeForSlice('entity');
createReadmeForSlice('widgets');
createReadmeForSlice('pages');

project.save();
