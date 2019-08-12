import { isReferenceObject, isSchemaObject, ReferenceObject, SchemaObject } from 'openapi3-ts';

import { getSchemaName } from './utils';

export function createSchemaType(schema: SchemaObject): string {
  if (isReferenceObject(schema)) {
    return getSchemaName(schema.$ref);
  }

  if (schema.enum) {
    return `'` + schema.enum.join(`' | '`) + `'`;
  }

  if (schema.oneOf) {
    return schema.oneOf.map(nextSchema => createSchemaType(nextSchema)).join(' | ');
  }

  if (schema.allOf) {
    return schema.allOf.map(nextSchema => createSchemaType(nextSchema)).join(' & ');
  }

  switch (schema.type) {
    case 'integer':
      return 'number';

    case 'object': {
      if (schema.additionalProperties) {
        if (isSchemaObject(schema.additionalProperties as any)) {
          switch ((schema.additionalProperties as SchemaObject).type) {
            case 'number':
            case 'integer':
              return 'Record<string, number>';

            case 'boolean':
              return 'Record<string, boolean>';

            case 'string':
              return 'Record<string, string>';

            default:
              return 'Record<string, any>';
          }
        } else if (isReferenceObject(schema.additionalProperties as any)) {
          const type = getSchemaName((schema.additionalProperties as ReferenceObject).$ref);
          return `Record<string, ${type}>`;
        }
      } else if (schema.properties) {
        return Object.keys(schema.properties).map(name => {
          const type = createSchemaType(schema.properties[name]);
          return `{ ${name}: ${type} }`;
        }).join(' | ');
      }

      // TODO:
      console.error(schema);
      break;
      //process.exit(1);
    }

    case 'array':
      const type = isReferenceObject(schema.items)
        ? getSchemaName(schema.items.$ref)
        : schema.items.type === 'integer'
          ? 'number'
          : schema.items.type;

      return `${type}[]`;

    default:
      return schema.type;
  }
}