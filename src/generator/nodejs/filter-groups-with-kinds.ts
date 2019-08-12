import { GroupTS } from './interfaces';

export function filterGroupsWithKinds(groups: GroupTS[]): GroupTS[] {
  return groups.reduce((groupsWithKinds, { group, versions }) => {
    versions = versions.reduce((versionsWithKinds, { version, schemas }) => {
      schemas = schemas.filter(({ isKind }) => isKind);

      return schemas.length > 0
        ? [...versionsWithKinds, { version, schemas }]
        : versionsWithKinds;
    }, []);

    return versions.length > 0
      ? [...groupsWithKinds, { group, versions }]
      : groupsWithKinds;
  }, []);
}
