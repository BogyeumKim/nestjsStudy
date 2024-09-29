import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(auth: AuthCredentialDto): Promise<void> {
    const { username, password } = auth;
    const salt = await bcrypt.genSalt();
    const hashPw = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashPw });

    try {
      await this.save(user);
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException('');
      }
    }
  }
}
