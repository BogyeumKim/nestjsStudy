import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(authDto);
  }

  async sighIn(authDto: AuthCredentialDto): Promise<{ accessToekn: string }> {
    const { username, password } = authDto;
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성
      const paylod = { username };
      const accessToekn = await this.jwtService.signAsync(paylod);

      return { accessToekn };
    } else {
      throw new UnauthorizedException('login falied');
    }
  }
}
