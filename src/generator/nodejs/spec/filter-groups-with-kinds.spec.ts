import { GroupTS } from '../interfaces';
import { filterGroupsWithKinds } from '../filter-groups-with-kinds';

describe('filterGroupsWithKinds', () => {
  it('should filter groups -> versions -> schemas -> kind', () => {
    const groups: GroupTS[] = [
      {
        group: 'networking',
        versions: [
          {
            version: 'v1alpha3',
            schemas: [
              {
                schema: 'DestinationRule',
                apiVersion: 'networking.istio.io/v1alpha3',
                description: null,
                isKind: true,
              },
              {
                schema: 'TrafficPolicy',
                apiVersion: 'networking.istio.io/v1alpha3',
                description: null,
                properties: [],
              },
            ],
          },
        ],
      },
      {
        group: 'authentication',
        versions: [
          {
            version: 'v1alpha1',
            schemas: [
              {
                schema: 'Policy',
                apiVersion: 'authentication.istio.io/v1alpha1',
                description: null,
                isKind: true,
              },
              {
                schema: 'TriggerRule',
                apiVersion: 'networking.istio.io/v1alpha3',
                description: null,
                properties: [],
              },
            ],
          },
        ],
      },
      {
        group: 'rbac',
        versions: [
          {
            version: 'v1alpha1',
            schemas: [
              {
                schema: 'WorkloadSelector',
                apiVersion: 'rbac.istio.io/v1alpha1',
                description: null,
                properties: [],
              },
            ],
          },
        ],
      },
    ];

    const groupsWithKinds = filterGroupsWithKinds(groups);
    expect(groupsWithKinds).toHaveLength(2);

    expect(groupsWithKinds[0]).toMatchObject({
      versions: [
        {
          schemas: [groups[0].versions[0].schemas[0]],
        },
      ],
    });

    expect(groupsWithKinds[1]).toMatchObject({
      versions: [
        {
          schemas: [groups[1].versions[0].schemas[0]],
        },
      ],
    });

    expect(groupsWithKinds).toMatchSnapshot();
  });
});
