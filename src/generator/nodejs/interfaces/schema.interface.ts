import { Kind } from '../../../enums';

import { PropertyTS } from './property.interface';
// import { GroupVersionKind } from './group-version-kind.interface';

export interface SchemaTS {
  schema: string;
  apiVersion: string;
  description?: string;
  // gvk: GroupVersionKind;
  isEnum?: boolean;
  isKind?: boolean;
  type?: string;
  properties?: PropertyTS[];
  // kind?: Kind;
}
