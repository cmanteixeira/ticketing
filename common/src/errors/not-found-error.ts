import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode = 404;
  reason = 'Not Found';
  constructor() {
    super('Route not found');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializeError() {
    return [{ message: this.reason }];
  }
}
