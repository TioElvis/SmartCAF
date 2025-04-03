import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import FastifyCookie from '@fastify/cookie';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Config
  app.enableCors({
    origin: process.env.BASE_CLIENT_URL,
    credentials: true,
  });
  await app.register(FastifyCookie);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 9000);
}

void bootstrap();
