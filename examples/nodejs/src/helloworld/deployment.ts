import * as istio from 'pulumi-k8s-istio';

import { istioChart } from '../istio';

const vsc = new istio.networking.v1alpha3.VirtualService(
  'test',
  {
    metadata: {
      name: 'test',
    },
    spec: {
      hosts: ['*'],
      gateways: [],
    },
  },
  { dependsOn: [istioChart] },
);
