import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './boards-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoard(createBoard: CreateBoardDto, user: User): Promise<Board> {
    const { title, description } = createBoard;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    await board.save();
    return board;
  }
}
