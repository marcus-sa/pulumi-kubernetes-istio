// TODO: Clean this up
export function getGroupVersions(paths: string[]): { group: string, versions: string[] }[] {
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
    .reduce((unique, item) => {
      const u = unique.find(({ group }) => group === item.group);

      if (u) {
        u.versions = [...new Set([...u.versions, ...item.versions])];
      }

      return u ? unique : [...unique, item];
    }, []);
}