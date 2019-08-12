import * as istio from 'pulumi-k8s-istio';

import { helloWorldService } from './service';
import { helloWorldGateway } from './gateway';

export const helloWorldVirtualService = new istio.networking.v1alpha3.VirtualService('helloworld-vsc', {
  metadata: {
    name: helloWorldService.metadata.name,
  },
  spec: {
    hosts: ['*'],
    gateways: [helloWorldGateway.metadata.name],
    http: [
      {
        match: [
          {
            uri: {
              exact: '/hello',
            },
          },
        ],
      },
    ],
  },
});
