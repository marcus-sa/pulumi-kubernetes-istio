import { OpenAPIObject } from 'openapi3-ts';
import { join } from 'path';

import { isOpenApiDefinition } from '../../utils';

export async function getDefinition(path: string, istioApiPath: string): Promise<OpenAPIObject | null> {
  const definition = await import(join(istioApiPath, path));
  return isOpenApiDefinition(definition) ? definition : null;
}

export async function getDefinitions(paths: string[], istioApiPath: string): Promise<OpenAPIObject[]> {
  const definitions = await Promise.all(paths.map(entry => getDefinition(entry, istioApiPath)));
  return definitions.filter(definition => !!definition);
}