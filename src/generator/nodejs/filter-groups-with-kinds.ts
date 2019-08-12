import { GroupTS } from './interfaces';

export function filterGroupsWithKinds(groups: GroupTS[]): GroupTS[] {
  const groupsWithKinds: GroupTS[] = [];

  for (const { group, versions } of groups) {
    if (versions.some(({ schemas }) => schemas.some(({ isKind }) => isKind))) {
      const groupIndex = groupsWithKinds.push({
        group,
        versions: [],
      }) - 1;

      for (const { version, schemas } of versions) {
        if (schemas.some(({ isKind }) => isKind)) {
          const versionIndex = groupsWithKinds[groupIndex].versions.push({
            version,
            schemas: [],
          }) - 1;

          for (const schema of schemas) {
            if (schema.isKind) {
              groupsWithKinds[groupIndex].versions[versionIndex].schemas.push(schema);
            }
          }
        }
      }
    }
  }

  return groupsWithKinds;
}