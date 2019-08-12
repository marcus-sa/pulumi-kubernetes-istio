import { Options } from './options.interface';

export interface Generator {
  generate(options: Options): Promise<void>;
}