export type BuildMode = 'development' | 'production';

export interface BuildEnv {
  mode: BuildMode;
  port: number;
  analyze: boolean;
}

export interface BuildPaths {
  entry: string;
  output: string;
  html: string;
  src: string;
}

export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
  isAnalyze: boolean;
  port: number;
}
