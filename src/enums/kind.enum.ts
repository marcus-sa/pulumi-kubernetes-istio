export enum Kind {
  DESTINATION_RULE = 'DestinationRule',
  ENVOY_FILTER = 'EnvoyFilter',
  GATEWAY = 'Gateway',
  SERVICE_ENTRY = 'ServiceEntry',
  SIDECAR = 'Sidecar',
  VIRTUAL_SERVICE = 'VirtualService',
  SERVICE_ROLE = 'ServiceRole',
  SERVICE_ROLE_BINDING = 'ServiceRoleBinding',
  HTTP_API_SPEC = 'HTTPAPISpec',
  HTTP_API_SPEC_BINDING = 'HTTPAPISpecBinding',
  POLICY = 'Policy',
  // TODO: pascal case these when being generated
  HANDLER = 'Handler',
  INSTANCE = 'Instance',
  RULE = 'Rule',
  // TODO: handlers
  // PROMETHEUS = 'prometheus',
  // APIGEE = 'apigee',
}