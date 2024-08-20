import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClientOptions, MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000); // HTTP 서버 시작
}
bootstrap();
