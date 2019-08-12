// *** WARNING: this file was generated by the Pulumi Kubernetes Istio codegen tool. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import { CustomResource, CustomResourceOptions, Inputs, Input, ID, Output } from '@pulumi/pulumi';
import { types } from '@pulumi/kubernetes';

import { input, output } from '../../types';


export class VirtualService extends CustomResource {
    /** @internal */
    private static readonly __pulumiType = 'kubernetes:networking.istio.io/v1alpha3:VirtualService';

    /**
     * Standard object metadata. More info:
     * https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    public readonly metadata: Output<types.output.meta.v1.ObjectMeta>;

    /**
     * Spec holds information about the request being evaluated
     */
    public readonly spec: Output<output.networking.v1alpha3.VirtualServiceSpec>;

    public static get(name: string, id: Input<ID>, opts: CustomResourceOptions = {}): VirtualService {
        return new VirtualService(name, undefined, { ...opts, id });
    }

    /**
     * Returns true if the given object is an instance of DestinationRule.
     * This is designed to work even when multiple copies of the Pulumi SDK have been loaded into the same process.
     */
    public static isInstance(obj: any): obj is VirtualService {
        return obj != null && obj['__pulumiType'] === VirtualService.__pulumiType;
    }

    /**
     * Create a networking.v1alpha3.VirtualService resource with the given unique name, arguments, and options.
     *
     * @param name The _unique_ name of the resource.
     * @param args The arguments to use to populate this resource's properties.
     * @param opts A bag of options that control this resource's behavior.
     */
    // @TODO: Generate input types for args
    constructor(name: string, args: input.networking.v1alpha3.VirtualService, opts: CustomResourceOptions = {}) {
        const inputs: Inputs = {
            apiVersion: 'networking.istio.io/v1alpha3',
            kind: 'VirtualService',
            ...args,
        };

        //if (!opts.version) {
        //    opts.version = getVersion();
        //}

        super(VirtualService.__pulumiType, name, inputs, opts);
    }
}