import {BaseService} from 'dok-ts/base/BaseService';
import * as swaggerJSDoc from 'swagger-jsdoc';
import {getApplication} from 'dok-ts';
import * as fs from 'fs';
import * as path from 'path';

export class SwaggerService extends BaseService {

  private swagger = {};
  public static options = {
    paths: [],
    swaggerDefinitions: {
      info: {
        description: '',
        version: '1.0.0',
        title: 'Swagger',
        termsOfService: '',
        contact: {},
        license: {
          name: '',
          url: ''
        }
      },
      host: '',
      basePath: '/',
      schemes: ['http'],
      paths: {},
      securityDefinitions: {},
      externalDocs: {}
    }
  };

  public findAllFiles(directory, ext) {
    const regexp = new RegExp(ext + '$');
    if (fs.existsSync(directory)) {
      return fs.readdirSync(directory)
        .filter(file => !!file.match(regexp))
        .map(file => path.join(directory, file))
    }
    return [];
  }

  public init() {
    super.init();
    const application = getApplication();
    const modulesName = Object.keys(application.config.modules);
    modulesName.push(application.getId());

    let files = this.config.paths;

    modulesName.forEach(moduleName => {
      const module = application.getModule(moduleName);
      files = files.concat(this.findAllFiles(path.join(module.getModelsDirPath(), 'data'), module.config.models.ext));
      files = files.concat(this.findAllFiles(path.join(module.getControllersDirPath()), module.config.controller.ext));
    });

    this.swagger = swaggerJSDoc({swaggerDefinition: this.config.swaggerDefinitions, apis: files});
  }

  public get() {
    return this.swagger;
  }
}