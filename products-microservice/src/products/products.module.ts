import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDERS_MICROSERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://bemol_rabbitmq:5672'],
          queue: 'orders_queue',
        },
      },
      {
        name: 'INVENTORY_MICROSERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://bemol_rabbitmq:5672'],
          queue: 'inventory_queue',
        },
      },
    ]),
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule { }
