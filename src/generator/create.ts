import { Options } from '../interfaces';
import { AbstractGenerator } from '../abstract-generator';
import { SDK } from '../enums';

export async function createGenerator(options: Options): Promise<AbstractGenerator> {
  switch (options.sdk) {
    case SDK.Node:
      return new (await import('./nodejs')).NodeGenerator(options);

    case SDK.Python:
      throw new Error('not yet implemented');
  }
}
