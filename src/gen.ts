import * as execa from 'execa';
import * as glob from 'fast-glob';
import { join } from 'path';

import { Options } from './interfaces';
import { createGenerator } from './generator/create';

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

  await execa('rm', ['-rf', options.istioApiPath]);
  await execa('git', ['clone', options.istioApiRepo, options.istioApiPath]);

  options.jsonPaths = await glob(['**/*.json'], {
    cwd: options.istioApiPath,
  });

  const generator = await createGenerator(options.sdk);
  await generator.generate(options);

  await execa('rm', ['-rf', istioApiPath]);
})();
