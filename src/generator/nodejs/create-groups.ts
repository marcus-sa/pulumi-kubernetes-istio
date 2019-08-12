import { GroupTS, GroupVersions } from './interfaces';
import { getDefinitions } from './get-definitions';
import { createSchemas } from './create-schemas';

// TODO: Clean this up
export async function createGroups(
  groupVersions: GroupVersions[],
  paths: string[],
  istioApiPath: string,
): Promise<GroupTS[]> {
  const groups: GroupTS[] = [];
  for (const { group, versions } of groupVersions) {
    const groupIndex =
      groups.push({
        group,
        versions: [],
      }) - 1;

    for (const version of versions) {
      const groupVersionPaths = paths.filter(path => path.includes(`${group}/${version}`));
      const definitions = await getDefinitions(groupVersionPaths, istioApiPath);

      const versionIndex =
        groups[groupIndex].versions.push({
          version,
          schemas: [],
          inputs: [],
        }) - 1;

      for (const definition of definitions) {
        const { schemas, inputs } = groups[groupIndex].versions[versionIndex];
        schemas.push(...createSchemas(definition, false));
        inputs!.push(...createSchemas(definition, true));
      }
    }
  }

  return groups;
}
