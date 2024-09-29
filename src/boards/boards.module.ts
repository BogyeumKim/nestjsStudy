import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { join } from 'path';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository],
  imports: [AuthModule],
})
export class BoardsModule {}
