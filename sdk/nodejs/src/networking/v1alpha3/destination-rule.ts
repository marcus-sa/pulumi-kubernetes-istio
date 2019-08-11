import { CustomResource, Output, Inputs, Input, ID, CustomResourceOptions } from '@pulumi/pulumi';
import { types } from '@pulumi/kubernetes';

import { input } from '../../types';

export class DestinationRule extends CustomResource {
  /** @internal */
  private static readonly __pulumiType = 'kubernetes:istio:networking/v1alpha3:DestinationRule';

  public static get(name: string, id: Input<ID>, opts: CustomResourceOptions = {}): DestinationRule {
    return new DestinationRule(name, undefined, { ...opts, id });
  }

  /**
   * Returns true if the given object is an instance of DestinationRule.
   * This is designed to work even when multiple copies of the Pulumi SDK have been loaded into the same process.
   */
  public static isInstance(obj: any): obj is DestinationRule {
    // return obj instanceof DestinationRule;
    return obj != null && obj['__pulumiType'] === DestinationRule.__pulumiType;
  }

  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should
   * convert recognized schemas to the latest internal value, and may reject unrecognized
   * values. More info:
   * https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  public readonly apiVersion: Output<'networking.istio.io/v1alpha3'>;

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may
   * infer this from the endpoint the client submits requests to. Cannot be updated. In
   * CamelCase. More info:
   * https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  public readonly kind: Output<'DestinationRule'>;

  /**
   * Standard object metadata. More info:
   * https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
   */
  public readonly metadata: Output<types.output.meta.v1.ObjectMeta>;

  /**
   * https://istio.io/docs/reference/config/networking/v1alpha3/destination-rule/#DestinationRule
   */
  public readonly spec: Output<input.networking.v1alpha3.DestinationRuleSpec>;

  constructor(name: string, args: input.networking.v1alpha3.DestinationRule = {}, opts: CustomResourceOptions = {}) {
    const inputs: Inputs = {};

    super(DestinationRule.__pulumiType, name, inputs, opts);
  }
}