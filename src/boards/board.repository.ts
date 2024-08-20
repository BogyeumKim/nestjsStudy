import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './boards-status.enum';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoard(createBoard: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoard;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await board.save();
    return board;
  }
}
