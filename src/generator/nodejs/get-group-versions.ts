import { GroupVersions } from './interfaces';

export function getGroupVersions(paths: string[]): GroupVersions[] {
  return paths
    .map(path => {
      const paths = path.split('/');
      return paths.slice(0, paths.length - 1);
    })
    .filter(urn => urn.length < 3)
    .map(urn => ({
      group: urn[0],
      versions: [urn[1]],
    }))
    .reduce((items, item) => {
      const group = items.find(({ group }) => group === item.group);

      if (group) {
        group.versions = [...new Set([...group.versions, ...item.versions])];
      }

      return group ? items : [...items, item];
    }, []);
}
