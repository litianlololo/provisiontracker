import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 允许的前端应用地址，将其替换为您的前端应用地址
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // 如果需要传递凭证（如Cookie），请启用此选项
  });
  await app.listen(3000);
}
bootstrap();