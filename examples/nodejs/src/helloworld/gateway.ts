import * as istio from 'pulumi-k8s-istio';

import { istioChart } from '../istio';

export const helloWorldGateway = new istio.networking.v1alpha3.Gateway(
  'helloworld-gateway',
  {
    metadata: {
      name: 'helloworld-gateway',
    },
    spec: {
      selector: {
        istio: 'ingressgateway',
      },
      servers: [
        {
          port: {
            number: 80,
            name: 'http',
            protocol: 'HTTP',
          },
          hosts: ['*'],
        },
      ],
    },
  },
  { dependsOn: [istioChart] },
);
