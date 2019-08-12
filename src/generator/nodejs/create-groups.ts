import deepmerge = require('deepmerge');

import { GroupTS, GroupVersions, VersionTS } from './interfaces';
import { getDefinitions } from './get-definitions';
import { createSchemas } from './create-schemas';

// TODO: Clean this up
export async function createGroups(
  groupVersions: GroupVersions[],
  paths: string[],
  istioApiPath: string,
): Promise<GroupTS[]> {
  return Promise.all(groupVersions.map(async ({ group, versions }) => {
    const groupVersions: VersionTS[] = await Promise.all(versions.map(async (version) => {
      const groupVersionPaths = paths.filter(path => path.includes(`${group}/${version}`));
      const definitions = await getDefinitions(groupVersionPaths, istioApiPath);

      const initial: VersionTS = {
        version,
        schemas: [],
        inputs: [],
      };

      return definitions.reduce((version, definition) =>
        deepmerge(version, {
          schemas: createSchemas(definition, false),
          inputs: createSchemas(definition, true),
        } as VersionTS),
        initial,
      );
    }));

    return { group, versions: groupVersions };
  }));
}
