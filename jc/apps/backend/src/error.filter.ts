/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch(Error)
export default class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<any>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let body: any = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: 'Internal server error',
      errors: [],
    };

    // Se for HttpException (BadRequestException etc)
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      body = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: (exceptionResponse as any).message || exception.message,
        errors: (exceptionResponse as any).errors || [],
      };
    } else if (exception instanceof Error) {
      // Qualquer outro erro genérico
      body.message = exception.message;
    }

    response.status(status).json(body);
  }
}
