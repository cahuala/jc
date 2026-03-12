import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import errorFilter from './error.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
// Filtro global de erros
  app.useGlobalFilters(new errorFilter());

  // Iniciar o servidor
  const server = await app.listen(process.env.PORT ?? 3000);
  server.setTimeout(120000)
  console.log(
    `🚀 Servidor a correr em http://localhost:${process.env.PORT ?? 3000}`,
  );
}

bootstrap();
