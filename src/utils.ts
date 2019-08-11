import { OpenAPIObject } from 'openapi3-ts';

import { Kind } from './enums';

export const isKind = (name: string): name is Kind => Object.values(Kind).includes(name);

export const isOpenApiDefinition = (obj: any): obj is OpenAPIObject => 'openapi' in obj;

export const last = <T>(arr: T[], n = 1): T => arr[arr.length - n];

export const getSchemaName = (name: string): string => last(name.split('.'));

export const includes = (str: string, search: string): boolean => str.localeCompare(search) >= 1;

export const createApiVersion = (group: string, version: string): string => `${group}.istio.io/${version}`;