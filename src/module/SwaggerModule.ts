import {BaseModule} from 'dok-ts/base/BaseModule';

export class SwaggerModule extends BaseModule {
  public static options = {
    basePath: __dirname,
    controller: {
      ext: '.js'
    }
  };
  public readonly id = 'SwaggerModule';
}