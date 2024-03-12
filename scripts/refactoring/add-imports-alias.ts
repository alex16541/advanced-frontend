import { Project } from 'ts-morph';

const project = new Project();

project.addSourceFilesAtPaths(['../../src/**/*.ts', '../../src/**/*.tsx']);

const files = project.getSourceFiles();

const layers = ['app', 'shared', 'entity', 'widgets', 'features', 'pages'];

const isAbsolut = (path:string) => layers.some((layer) => path.startsWith(layer));

files.forEach((file) => {
    const imports = file.getImportDeclarations();

    imports.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue();

        if (isAbsolut(value)) {
            importDeclaration.setModuleSpecifier(`@/${value}`);
        }
    });
});

project.save();
