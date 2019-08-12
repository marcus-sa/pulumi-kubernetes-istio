import * as execa from 'execa';
import * as glob from 'fast-glob';
import { join } from 'path';
import { readFile, writeFile } from 'fs-extra';
import * as mustache from 'mustache';

import { Options, Generator } from './interfaces/options.interface';
import { createGenerator } from './generator/create';
import { SDK } from './enums';

// Usage: <language> <istio-api-repo-url> <istio-api-path> <template-dir> <out-dir>
(async () => {
  const [
    sdk,
    istioApiRepo = 'https://github.com/istio/api',
    istioApiPath = 'istio-api',
    templateDir = `src/templates/${sdk}`,
    outDir = `sdk/${sdk}/src`,
  ] = process.argv.slice(2);
  const options = {
    istioApiPath: join(process.cwd(), istioApiPath),
    istioApiRepo,
    templateDir,
    outDir,
    sdk,
  } as Options;
  // console.log('Emptying Istio API...');
  await execa('rm', ['-rf', options.istioApiPath]);

  // console.log('Cloning Istio API...');
  await execa('git', ['clone', options.istioApiRepo, options.istioApiPath]);

  // console.log('Globbing all JSON files');
  options.jsonPaths = await glob(['**/*.json'], {
    cwd: options.istioApiPath,
  });

  const generator = await createGenerator(options.sdk);
  await generator.generate(options);

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
