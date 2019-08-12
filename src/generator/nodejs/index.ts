import { readFile, writeFile } from 'fs-extra';
import { join } from 'path';
import * as mustache from 'mustache';

import { Generator, Options } from '../../interfaces';
import { getGroupVersions } from './get-group-versions';
import { createGroups } from './create-groups';
import { GroupTS } from './interfaces';

export class NodeGenerator implements Generator {
	private async generateInputTypes(groups: GroupTS[], { templateDir, outDir }: Options) {
    const typesInputTemplate = await readFile(join(templateDir, 'types', 'input.ts.mustache'), 'utf8');
    const typesInputTs = mustache.render(typesInputTemplate, { groups });

    await writeFile(join(outDir, 'types', 'input.ts'), typesInputTs, 'utf8');
	}

	private async generateOutputTypes(groups: GroupTS[], { templateDir, outDir }: Options) {
    const typesOutputTemplate = await readFile(join(templateDir, 'types', 'output.ts.mustache'), 'utf8');
    const typesOutputTs = mustache.render(typesOutputTemplate, { groups });

    await writeFile(join(outDir, 'types', 'output.ts'), typesOutputTs, 'utf8');
	}

	/*private async generateIndexes(groups: GroupTS[], { templateDir, outDir }: Options) {
		for (const { group } of groups) {

		}
	}*/

  async generate(options: Options) {
    const groupVersions = getGroupVersions(options.jsonPaths);
    const groups = await createGroups(groupVersions, options.jsonPaths, options.istioApiPath);

    // Generate input types
    await this.generateInputTypes(groups, options);
    // Generate output types
    await this.generateOutputTypes(groups, options);
    // Generate indexes
    // await this.generateIndexes(groups, options);
  }
}