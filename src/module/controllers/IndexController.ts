import {WebController} from 'dok-ts/web/WebController';
import {ResponseService} from 'dok-ts/services/ResponseService';
import {SwaggerService} from '../../service/SwaggerService';

export class IndexController extends WebController {
  constructor(private swaggerService: SwaggerService) {
    super();
  }

  public indexAction() {
    return {
      body: JSON.stringify(this.swaggerService.get()),
      headers: {
        'Content-Type': ResponseService.types.json
      },
      statusCode: 200
    }
  }
}