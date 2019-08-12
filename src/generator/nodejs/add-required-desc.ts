import { SchemaObject } from 'openapi3-ts';

import { PropertyTS } from './interfaces';

export function addRequiredDescription({ description }: SchemaObject, property: PropertyTS) {
  if (description) {
    property.description = description;

    if (description.toLocaleLowerCase().startsWith('required')) {
      property.required = true;
    } else if (description.toLocaleLowerCase().startsWith('optional')) {
      // HINT: mustache only checks if the property exists, not for equality; so we'll have to delete it instead
      delete property.required;
    }
  }
}
