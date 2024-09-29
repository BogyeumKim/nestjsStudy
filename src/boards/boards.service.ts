import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { BoardStatus } from './boards-status.enum';
import { User } from 'src/auth/user.entity';


@Injectable()
export class BoardsService {

  constructor(
    @InjectRepository(BoardRepository)
    private readonly boardRepositroy: BoardRepository,
  ) {}


  async getAllBoards():Promise<Board[]> {
    return this.boardRepositroy.find();
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepositroy.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`${id} 를 찾을수없습니다`);
    }

    return found;
  }

  createBoards(createBoard: CreateBoardDto,user:User): Promise<Board> {
    return this.boardRepositroy.createBoard(createBoard,user);
  }

  async deleteBoard(id: number): Promise<void> {
    const reulst = await this.boardRepositroy.delete(id);

    if (reulst.affected === 0) {
      throw new NotFoundException('cnat find ID!');
    }
    console.log('result', reulst);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepositroy.save(board);

    return board;
  }

  // private boards: Board[] = [];

  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  // createBoards(createBoard: CreateBoardDto) {
  //   const { title, description } = createBoard;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };

  //   this.boards.push(board);
  //   return board;
  // }

  // getBoardById(id: string) {
  //   const found = this.boards.find((board) => board.id === id);

  //   if(!found ){
  //     throw new NotFoundException('ID가 없습니다.');
  //   }
  //   return found;
  // }

  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id)
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }

  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
} // Cass
