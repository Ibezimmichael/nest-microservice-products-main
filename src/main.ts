import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  // Create the HTTP server
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Set global prefix and enable CORS for HTTP server
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:4200',
  });

  // Listen on port 6001 for HTTP requests
  await app.listen(6001, () => {
    console.log('HTTP server listening on port 6001');
  });

  // Create the microservice with RabbitMQ transport
  const rabbitMQUrl = configService.get<string>('AMPQURL');
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [rabbitMQUrl],
        queue: 'main_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  // Start listening for RabbitMQ messages
  await microservice.listen();
  console.log('Microservice is live and listening to RabbitMQ');
}

bootstrap();
