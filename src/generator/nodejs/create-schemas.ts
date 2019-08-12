import { OpenAPIObject, SchemaObject } from 'openapi3-ts';

import { getSchemaName, isKind } from '../../utils';
import { addRequiredDescription } from './add-required-desc'
import { createSchemaType } from './create-schema-type';
import { PropertyTS, SchemaTS } from './interfaces';

export function createSchemas(definition: OpenAPIObject): SchemaTS[] {
  const { schemas: schemaDefs } = definition.components;

  return Object.keys(schemaDefs).map(name => {
    const schemaDef = schemaDefs[name] as SchemaObject;
    const schema = {} as SchemaTS;

    if (schemaDef.type === 'object') {
      if (schemaDef.properties) {
        schema.properties = Object.keys(schemaDef.properties).map(name => {
          const schemaPropertyDef = schemaDef.properties[name];
          const schemaProperty = { property: name } as PropertyTS;

          addRequiredDescription(schemaPropertyDef, schemaProperty);
          schemaProperty.type = createSchemaType(schemaPropertyDef);

          return schemaProperty;
        });

        if (schemaDef.required) {
          schemaDef.required.forEach(name => {
            const property = schema.properties.find(({ property }) => property === name);
            property.required = true;
          });
        }
      } else if (schemaDef.additionalProperties) {
        // console.log(schema.additionalProperties);
      }
    } else if (schemaDef.enum || schemaDef.oneOf) {
      schema.type = createSchemaType(schemaDef);
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