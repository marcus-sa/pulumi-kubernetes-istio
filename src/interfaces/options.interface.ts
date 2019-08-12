import { SDK }  from '../enums';

export interface Options {
	sdk: SDK;
	istioApiRepo: string;
	istioApiPath: string;
	templateDir: string;
	outDir: string;
	jsonPaths: string[];
}