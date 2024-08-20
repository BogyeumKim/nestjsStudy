import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository],
  imports: [
    ClientsModule.register([
      {
        name: 'GRPC_TEST_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50051',
          package: 'com.example.grpc.test',
          protoPath: join(__dirname, '../../src/proto/hello.proto'),
        },
      },
    ]),
  ],
})
export class BoardsModule {}
