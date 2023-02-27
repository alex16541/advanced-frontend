export default {
    clearMocks: true,
    coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
    moduleDirectories: ['node_modules', 'src'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    rootDir: '../../',
    testEnvironment: 'jsdom',
    testMatch: ['<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)'],
    setupFilesAfterEnv: ['<rootDir>config/jest/setupTests.ts'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
        '\\.svg$': '<rootDir>/config/jest/fileTransformer.tsx',
    },
};
