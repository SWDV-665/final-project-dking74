import BaseErrorResponse from './BaseErrorResponse';

export default class BadRequestErrorResponse extends BaseErrorResponse {
  constructor(message?: string) {
    super(
      `The request was poorly constructed. ${message ? message + '.':  ''} Please try again.`,
      400
    );
  }
}