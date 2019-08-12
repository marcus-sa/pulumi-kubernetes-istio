import { Generator } from '../interfaces';
import { SDK } from '../enums';

export async function createGenerator(sdk: SDK): Promise<Generator> {
  switch (sdk) {
    case SDK.Node:
      return new (await import('./nodejs')).NodeGenerator();

    case SDK.Python:
      throw new Error('not yet implemented');
  }
}
