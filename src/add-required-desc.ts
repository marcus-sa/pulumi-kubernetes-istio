import { SchemaObject } from 'openapi3-ts';

import { includes } from './utils';
import { Property } from './interfaces';

export function addRequiredDescription({ description }: SchemaObject, property: Property) {
  if (description) {
    property.description = description;

    if (includes(description, 'required')) {
      property.required = true;
    }
  }
}