import {
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { BoardStatus } from './boards-status.enum';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

interface GrpcService {
  sayHello(data: { name: string }): Observable<any>;
}

@Injectable()
export class BoardsService implements OnModuleInit {
  private service: GrpcService;

  constructor(
    @InjectRepository(BoardRepository)
    private readonly boardRepositroy: BoardRepository,
    @Inject('GRPC_TEST_PACKAGE')
    private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.service = this.client.getService<GrpcService>('Simple');
  }

  getGrpcRes(name : string): Observable<string> {
    return this.service.sayHello({ name });
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepositroy.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`${id} 를 찾을수없습니다`);
    }

    return found;
  }

  async createBoards(createBoard: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoard;
    const board = this.boardRepositroy.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

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
