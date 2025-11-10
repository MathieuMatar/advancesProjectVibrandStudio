import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { createAgent } from '@forestadmin/agent';
import { createSqlDataSource } from '@forestadmin/datasource-sql';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import * as fs from 'fs';

/**
 * Application bootstrap function.
 *
 * Initializes and starts the NestJS application:
 * - Configures and mounts the Forest Admin agent and SQL datasource.
 * - Creates the Nest app from `AppModule`.
 * - Sets up uploads static serving, CORS and global validation pipes.
 * - Starts the HTTP server on `process.env.PORT` or 3000.
 *
 * This file intentionally performs minimal runtime logic and does NOT export
 * the Nest application instance; it's the CLI entrypoint used to start the
 * server during development and production runs.
 */
async function bootstrap() {
  // Create Forest Admin agent
  const agent = createAgent({
    authSecret: process.env.FOREST_AUTH_SECRET as string,
    envSecret: process.env.FOREST_ENV_SECRET as string,
    isProduction: process.env.NODE_ENV === 'production',
    typingsPath: './typings.ts',
    typingsMaxDepth: 5,
  }).addDataSource(createSqlDataSource(process.env.DATABASE_URL as string));

  const app = await NestFactory.create(AppModule);

  const uploadsPath = join(__dirname, '..', '..', 'uploads');

  // CORS
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://app.forestadmin.com',
      /\.forestadmin\.com$/,
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Serve static files under /uploads prefix
  app.use('/uploads', express.static(uploadsPath));

  // Mount Forest Admin
  await agent.mountOnNestJs(app).start();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();