## PKI (Pulumi Kubernetes Istio)
Pulumi Kubernetes resources for Istio generated from the [Istio API](https://github.com/istio/istio-api)

<!--### Languages

|    | Language | Status | Runtime |
| -- | -------- | ------ | ------- |
| <img src="https://www.pulumi.com/assets/logos/tech/logo-ts.png" height=38 />     | [TypeScript](./sdk/nodejs/src) | WIP     | Node.js 8+  |
| <img src="https://www.pulumi.com/assets/logos/tech/logo-python.png" height=38 /> | [Python](./sdk/python/src)     | Stable  | Python 3.6+ |
| <img src="https://www.pulumi.com/assets/logos/tech/logo-golang.png" height=38 /> | [Go](./sdk/go/src)             | Preview | Go 1.x      |
-->
### Installation
```
$ yarn add pki @pulumi/pulumi @pulumi/kubernetes
```

### Prerequisites
Ensure you have instantiated Istio using `@pulumi/kubernetes`
<br />
An example on how to do so can be found [here](https://github.com/pulumi/pulumi-kubernetes/blob/master/tests/integration/istio/step1/istio.ts).

### Usage
PKI follows the same API spec as `@pulumi/kubernetes`

#### Example

Gateway
```ts
import * as istio from 'pki';

// ...

export const helloWorldGateway = new istio.networking.v1alpha3.Gateway(
  'hello-world-gateway',
  {
    metadata: {
      name: 'hello-world-gateway'
    },
    spec: {
      selector: {
        istio: 'ingressgateway'
      },
      servers: [
        {
          port: {
            number: 80,
            name: 'http',
            protocol: 'HTTP'
          },
          hosts: ['*']
        }
      ]
    }
  }
);
```
