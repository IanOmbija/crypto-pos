import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotnev from 'dotenv';

async function bootstrap() {
  dotnev.config();
  
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
