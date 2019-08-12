import * as k8s from '@pulumi/kubernetes';

export const helloWorldLabel = {
  app: 'hello-world',
};

export const helloWorldService = new k8s.core.v1.Service('helloworld-service', {
  metadata: {
    name: 'helloworld',
    labels: {
      ...helloWorldLabel,
    },
  },
  spec: {
    ports: [
      {
        port: 5000,
        name: 'http',
      },
    ],
    selector: helloWorldLabel,
  },
});
