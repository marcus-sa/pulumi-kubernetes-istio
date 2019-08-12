import { SchemaObject } from 'openapi3-ts';

import { includes } from '../../utils';
import { PropertyTS } from './interfaces';

export function addRequiredDescription({ description }: SchemaObject, property: PropertyTS) {
  if (description) {
    property.description = description;

    if (includes(description, 'required')) {
      property.required = true;
    }
  }
}