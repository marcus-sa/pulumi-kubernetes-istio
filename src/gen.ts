import * as execa from 'execa';
import * as glob from 'fast-glob';
import { join } from 'path';
import { readFile, writeFile } from 'fs-extra';
import * as mustache from 'mustache';

import { getGroupVersions } from './get-group-versions';
import { createGroups } from './create-groups';

// Usage: <language> <istio-api-repo-url> <istio-api-path> <template-dir> <out-dir>
(async () => {
  const [
    language,
    istioApiRepoUrl = 'https://github.com/istio/api',
    istioApiClonePath = 'istio-api',
    templateDir = `src/templates/${language}`,
    outDir = `sdk/${language}/src`,
  ] = process.argv.slice(2);
  const istioApiPath = join(process.cwd(), istioApiClonePath);

  // console.log('Emptying Istio API...');
  await execa('rm', ['-rf', istioApiPath]);

  // console.log('Cloning Istio API...');
  await execa('git', ['clone', istioApiRepoUrl, istioApiPath]);

  // console.log('Globbing all JSON files');
  const jsonPaths = await glob(['**/*.json'], {
    cwd: istioApiPath,
  });

  const groupVersions = getGroupVersions(jsonPaths);
  const groups = await createGroups(groupVersions, jsonPaths, istioApiPath);

  // Generate input types
  const typesInputTemplate = await readFile(join(templateDir, 'typesInput.ts.mustache'), 'utf8');
  const typesInputTs = mustache.render(typesInputTemplate, { groups });

  await writeFile(join(outDir, 'types', 'input.ts'), typesInputTs, 'utf8');

  // Generate output types
  const typesOutputTemplate = await readFile(join(templateDir, 'typesOutput.ts.mustache'), 'utf8');
  const typesOutputTs = mustache.render(typesOutputTemplate, { groups });

  await writeFile(join(outDir, 'types', 'output.ts'), typesOutputTs, 'utf8');

  /*const outputTypes = groups.map(({ schemaConfigs: schemas }) => {
    const template = readFileSync(join(templateDir, 'typesTest.ts.mustache')).toString();
    return mustache.render(template, { schemas });
    // writeFileSync(join(outDir, 'types', 'output.ts'), outputTypes, 'utf8');
    // process.exit();
    schemaConfigs.forEach(kind => {
      const template = readFileSync(join(templateDir, 'typesTest.ts.mustache')).toString();

      const kindTs = mustache.render(template, {
        ...kind,
        version,
        group,
      });

      writeFileSync(join(outDir, group, version, paramCase(kind.kind) + '.ts'), kindTs, 'utf8');

      // console.log(kind.properties);
    })
  });

  writeFileSync(join(outDir, 'types', 'output.ts'), outputTypes.join(`\r\n`), 'utf8');*/

  await execa('rm', ['-rf', istioApiPath]);
})();
