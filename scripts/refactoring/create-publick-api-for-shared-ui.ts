import path from 'node:path';
import { Project } from 'ts-morph';

const project = new Project();

project.addSourceFilesAtPaths(['../../src/**/*.ts', '../../src/**/*.tsx'])

const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui');
const sharedUiDir = project.getDirectory(uiPath);

const dirs = sharedUiDir?.getDirectories();

dirs?.forEach((dir) => {
    const dirName = dir.getBaseName();

    try {
        const fileText = `export * from './${dirName}';
`;
        const sourceFile = project.createSourceFile(`../../src/shared/ui/${dirName}/index.ts`, fileText);
        sourceFile.save();
    } catch (e) {
        console.log('Ошибка создания файла');
    }
});

const files = project.getSourceFiles();

const isSharedUi = (path:string) => path.startsWith('@/shared/ui/') && path.split('/').length === 5;

files.forEach((file) => {
    const imports = file.getImportDeclarations();

    imports.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue();
        const res = value.split('/');
        res.pop();

        if (isSharedUi(value)) {
            importDeclaration.setModuleSpecifier(res.join('/'));
        }
    });
});

project.save();
