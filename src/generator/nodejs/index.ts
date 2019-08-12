import * as mustache from 'mustache';
import * as execa from 'execa';
import paramCase = require('param-case');

import { AbstractGenerator } from '../../abstract-generator';
import { TemplateHandler } from '../../template-handler';
import { createApiVersion } from '../../utils';
import { Options } from '../../interfaces';

import { filterGroupsWithKinds } from './filter-groups-with-kinds';
import { getGroupVersions } from './get-group-versions';
import { createGroups } from './create-groups';
import { GroupTS, KindTS } from './interfaces';

export class NodeGenerator extends AbstractGenerator {
	private async generateInputTypes(groups: GroupTS[]) {
    const typesInputTemplate = await this.template.read('types', 'input.ts.mustache');
    const typesInputTs = mustache.render(typesInputTemplate, { groups });

    await this.template.write(typesInputTs, ['types', 'input.ts']);
	}

	private async generateOutputTypes(groups: GroupTS[]) {
    const typesOutputTemplate = await this.template.read('types', 'output.ts.mustache');
    const typesOutputTs = mustache.render(typesOutputTemplate, { groups });

    await this.template.write(typesOutputTs, ['types', 'output.ts']);
	}

	private async generateTypesIndex() {
	  const typesIndexTemplate = await this.template.read('types', 'index.ts.tpl');

    await this.template.write(typesIndexTemplate, ['types', 'index.ts']);
  }

	private async generateIndexes(groups: GroupTS[]) {
    const indexTemplate = await this.template.read('index.ts.mustache');
    const versionIndexTemplate = await this.template.read('versionIndex.ts.mustache');
    const kindIndexTemplate = await this.template.read('kindIndex.ts.mustache');
    const kindTemplate = await this.template.read('kind.ts.mustache');

    await this.generateTypesIndex();

    const groupsWithKinds = filterGroupsWithKinds(groups);

    const indexTs = mustache.render(indexTemplate, { groups: groupsWithKinds });
    await this.template.write(indexTs, ['index.ts']);


		for (const { group, versions } of groupsWithKinds) {
      const groupIndexTs = mustache.render(versionIndexTemplate, { versions });
      await this.template.write(groupIndexTs, [group, 'index.ts']);

      for (const { version, schemas } of versions) {
        const kinds = schemas.map(({ schema }) => ({
          kind: paramCase(schema),
        }));

        const versionIndexTs = mustache.render(kindIndexTemplate, { kinds });

        await this.template.write(versionIndexTs, [group, version, 'index.ts']);

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

          await this.template.write(kindTs, [group, version, kindFileName]);
        }
      }
		}
	}

  async generate() {
    const groupVersions = getGroupVersions(this.options.jsonPaths);
    const groups = await createGroups(groupVersions, this.options.jsonPaths, this.options.istioApiPath);
    // Clean outDir
    await execa('rm', ['-rf', this.options.outDir]);
    // Generate input types
    await this.generateInputTypes(groups);
    // Generate output types
    await this.generateOutputTypes(groups);
    // Generate indexes
    await this.generateIndexes(groups);
  }
}
