import { Kind } from '../enums';

import { Property } from './property.interface';
// import { GroupVersionKind } from './group-version-kind.interface';

export interface Schema {
  schema: string;
  apiVersion: string;
  description: string;
  // gvk: GroupVersionKind;
  isEnum?: boolean;
  isKind?: boolean;
  type?: string;
  properties?: Property[];
  // kind?: Kind;
}