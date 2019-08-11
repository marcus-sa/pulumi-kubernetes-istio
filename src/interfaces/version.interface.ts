import { Schema } from './schema.interface';

export interface Version {
  version: string;
  schemas: Schema[];
}

