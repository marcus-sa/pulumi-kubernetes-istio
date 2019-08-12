import { OpenAPIObject, SchemaObject } from 'openapi3-ts';

import { getSchemaName, isKind } from '../../utils';
import { addRequiredDescription } from './add-required-desc';
import { createSchemaType } from './create-schema-type';
import { PropertyTS, SchemaTS } from './interfaces';

export function createSchemas({ components: { schemas } }: OpenAPIObject, isInput: boolean): SchemaTS[] {
  return Object.keys(schemas).map(name => {
    const schemaDef = schemas[name] as SchemaObject;
    const schema = {} as SchemaTS;

    if (schemaDef.type === 'object') {
      if (schemaDef.properties) {
        schema.properties = Object.keys(schemaDef.properties).map(name => {
          const schemaPropertyDef = schemaDef.properties[name];
          const schemaProperty = { property: name } as PropertyTS;

          schemaProperty.type = createSchemaType(schemaPropertyDef, isInput);
          addRequiredDescription(schemaPropertyDef, schemaProperty);

          return schemaProperty;
        });

        if (schemaDef.required) {
          schemaDef.required.forEach(name => {
            const property = schema.properties.find(({ property }) => property === name);
            property.required = true;
          });
        }
      }
    } else if (schemaDef.enum || schemaDef.oneOf) {
      schema.type = createSchemaType(schemaDef, isInput);
      schema.isEnum = true;
    }

    const schemaName = getSchemaName(name);
    schema.schema = schemaName;

    if (isKind(schemaName)) {
      schema.isKind = true;
    }

    return schema;
  });
}
