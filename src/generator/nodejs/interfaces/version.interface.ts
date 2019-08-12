import { SchemaTS } from './schema.interface';

export interface VersionTS {
  version: string;
  schemas: SchemaTS[];
  inputs?: SchemaTS[];
}
