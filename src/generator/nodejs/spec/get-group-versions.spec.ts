import { getGroupVersions } from '../get-group-versions';

describe('getGroupVersions', () => {
  it('should combine all paths into group -> versions with no duplicates', () => {
    const paths = [
      'authentication/v1alpha1/istio.authentication.v1alpha1.json',
      'networking/v1alpha3/destination_rule.json',
      'networking/v1alpha3/envoy_filter.json',
      'policy/v1beta1/istio.policy.v1beta1.json',
      'rbac/v1alpha1/istio.rbac.v1alpha1.json',
      'rbac/v1alpha2/istio.rbac.v1alpha1.json',
      'mixer/adapter/model/v1beta1/istio.mixer.adapter.model.v1beta1.json',
      'mixer/v1/config/client/istio.mixer.v1.config.client.json',
    ];

    const groupVersions = getGroupVersions(paths);

    expect(groupVersions).toStrictEqual([
      {
        group: 'authentication',
        versions: ['v1alpha1'],
      },
      {
        group: 'networking',
        versions: ['v1alpha3'],
      },
      {
        group: 'policy',
        versions: ['v1beta1'],
      },
      {
        group: 'rbac',
        versions: ['v1alpha1', 'v1alpha2'],
      },
    ]);

    expect(groupVersions).toMatchSnapshot();
  });
});
