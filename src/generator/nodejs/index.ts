import * as mustache from 'mustache';
import * as execa from 'execa';
import paramCase = require('param-case');

import { createApiVersion } from '../../utils';
import { Generator, Options } from '../../interfaces';
import { TemplateHandler } from './template-handler';
import { filterGroupsWithKinds } from './filter-groups-with-kinds';
import { getGroupVersions } from './get-group-versions';
import { createGroups } from './create-groups';
import { GroupTS, KindTS } from './interfaces';

export class NodeGenerator implements Generator {
	private async generateInputTypes(groups: GroupTS[], template: TemplateHandler) {
    const typesInputTemplate = await template.read('types', 'input.ts.mustache');
    const typesInputTs = mustache.render(typesInputTemplate, { groups });

    await template.write(typesInputTs, ['types', 'input.ts']);
	}

	private async generateOutputTypes(groups: GroupTS[], template: TemplateHandler) {
    const typesOutputTemplate = await template.read('types', 'output.ts.mustache');
    const typesOutputTs = mustache.render(typesOutputTemplate, { groups });

    await template.write(typesOutputTs, ['types', 'output.ts']);
	}

	private async generateTypesIndex(template: TemplateHandler) {
	  const typesIndexTemplate = await template.read('types', 'index.ts.tpl');

    await template.write(typesIndexTemplate, ['types', 'index.ts']);
  }

	private async generateIndexes(groups: GroupTS[], template: TemplateHandler) {
    const indexTemplate = await template.read('index.ts.mustache');
    const versionIndexTemplate = await template.read('versionIndex.ts.mustache');
    const kindIndexTemplate = await template.read('kindIndex.ts.mustache');
    const kindTemplate = await template.read('kind.ts.mustache');

    await this.generateTypesIndex(template);

    const indexTs = mustache.render(indexTemplate, { groups });
    await template.write(indexTs, ['index.ts']);

    const groupsWithKinds = filterGroupsWithKinds(groups);


		for (const { group, versions } of groupsWithKinds) {
      const groupIndexTs = mustache.render(versionIndexTemplate, { versions });
      await template.write(groupIndexTs, [group, 'index.ts']);

      for (const { version, schemas } of versions) {
        const kinds = schemas.map(({ schema }) => ({
          kind: paramCase(schema),
        }));

        const versionIndexTs = mustache.render(kindIndexTemplate, { kinds });

        await template.write(versionIndexTs, [group, version, 'index.ts']);

        for (const schema of schemas) {
          const apiVersion = createApiVersion(group, version);

          const kind: KindTS = {
            description: schema.description,
            kind: schema.schema,
            apiVersion,
            group,
            version,
          };

          const kindTs = mustache.render(kindTemplate, kind);
          const kindFileName = paramCase(schema.schema) + '.ts';

          await template.write(kindTs, [group, version, kindFileName]);
        }
      }
		}
	}

  async generate(options: Options) {
    const groupVersions = getGroupVersions(options.jsonPaths);
    const groups = await createGroups(groupVersions, options.jsonPaths, options.istioApiPath);

    const template = new TemplateHandler(options);
    // Clean outDir
    await execa('rm', ['-rf', options.outDir]);
    // Generate input types
    await this.generateInputTypes(groups, template);
    // Generate output types
    await this.generateOutputTypes(groups, template);
    // Generate indexes
    await this.generateIndexes(groups, template);
  }
}
