import { outputFile, readFile } from 'fs-extra';
import { join } from 'path';

import { Options } from '../../interfaces';

export class TemplateHandler {
  constructor(private readonly options: Options) {}

  read(...templatePaths: string[]) {
    return readFile(join(this.options.templateDir, ...templatePaths), 'utf8');
  }

  write(data: string, outPaths: string[]) {
    return outputFile(join(this.options.outDir, ...outPaths), data, 'utf8');
  }
}
