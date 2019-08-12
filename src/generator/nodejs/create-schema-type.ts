import { isReferenceObject, isSchemaObject, SchemaObject } from 'openapi3-ts';

import { getSchemaName } from '../../utils';

// @TODO: Create schemas based on input/output
export function createSchemaType(schema: SchemaObject, isInput?: boolean): string {
  if (isReferenceObject(schema)) {
    return getSchemaName(schema.$ref);
  }

  if (schema.enum) {
    return `'` + schema.enum.join(`' | '`) + `'`;
  }

  if (schema.oneOf) {
    return schema.oneOf.map(nextSchema => createSchemaType(nextSchema, isInput)).join(' | ');
  }

  if (schema.allOf) {
    return schema.allOf.map(nextSchema => createSchemaType(nextSchema, isInput)).join(' & ');
  }

  switch (schema.type) {
    case 'integer':
      return 'number';

    case 'object': {
      if (!!schema.additionalProperties && typeof schema.additionalProperties !== 'boolean') {
        if (isSchemaObject(schema.additionalProperties)) {
          switch (schema.additionalProperties.type) {
            case 'number':
            case 'integer':
              return isInput ? 'Record<Input<string>, Input<number>>' : 'Record<string, number>';

            case 'boolean':
              return isInput ? 'Record<Input<string>, Input<boolean>>' : 'Record<string, boolean>';

            case 'string':
              return isInput ? 'Record<Input<string>, Input<string>>' : 'Record<string, string>';

            default:
              // return 'Record<Input<string>, Input<any>>';
              return 'object';
          }
        } else if (isReferenceObject(schema.additionalProperties)) {
          const type = getSchemaName(schema.additionalProperties.$ref);
          return isInput ? `Record<Input<string>, Input<${type}>>` : `Record<string, ${type}>`;
        }
      } else if (schema.properties) {
        return Object.keys(schema.properties)
          .map(name => {
            const type = createSchemaType(schema.properties[name], isInput);
            return isInput ? `{ ${name}: Input<${type}> }` : `{ ${name}: ${type} }`;
          })
          .join(' | ');
      }

      return 'object';
    }

    case 'array':
      const type = isReferenceObject(schema.items)
        ? getSchemaName(schema.items.$ref)
        : schema.items.type === 'integer'
        ? 'number'
        : schema.items.type;

      return isInput ? `Input<${type}>[]` : `${type}[]`;

    default:
      return schema.type;
  }
}
