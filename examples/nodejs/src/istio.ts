import * as k8s from '@pulumi/kubernetes';
import { k8sProvider } from './cluster';

import * as config from './config';

const appName = 'istio';
const namespace = new k8s.core.v1.Namespace(
  `${appName}-system`,
  { metadata: { name: `${appName}-system` } },
  { provider: k8sProvider },
);

const adminBinding = new k8s.rbac.v1.ClusterRoleBinding(
  'cluster-admin-binding',
  {
    metadata: { name: 'cluster-admin-binding' },
    roleRef: {
      apiGroup: 'rbac.authorization.k8s.io',
      kind: 'ClusterRole',
      name: 'cluster-admin',
    },
    subjects: [
      {
        apiGroup: 'rbac.authorization.k8s.io',
        kind: 'User',
        name: config.gcpUsername,
      },
    ],
  },
  { provider: k8sProvider },
);

export const istioInit = new k8s.helm.v2.Chart(
  `${appName}-init`,
  {
    chart: 'https://github.com/istio/istio/tree/master/install/kubernetes/helm/istio-init',
    version: '1.1.0',
    namespace: namespace.metadata.name,
    values: { kiali: { enabled: true } },
  },
  {
    dependsOn: [namespace, adminBinding],
    providers: { kubernetes: k8sProvider },
  },
);

export const istioChart = new k8s.helm.v2.Chart(
  appName,
  {
    chart: 'https://github.com/istio/istio/tree/master/install/kubernetes/helm/istio',
    version: '1.1.0',
    namespace: namespace.metadata.name,
    values: { kiali: { enabled: true } },
  },
  {
    dependsOn: [namespace, adminBinding, istioInit],
    providers: { kubernetes: k8sProvider },
  },
);

export const port = istioChart
  .getResourceProperty('v1/Service', 'istio-system', 'istio-ingressgateway', 'spec')
  .apply(p => p.ports.filter(p => p.name == 'http2'));
