import { Options } from './interfaces';

import { TemplateHandler } from './template-handler';

export abstract class AbstractGenerator {
  protected readonly template = new TemplateHandler(this.options);

  public constructor(protected readonly options: Options) {}

  abstract generate(): Promise<void>;
}
