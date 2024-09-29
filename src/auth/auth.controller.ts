import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authDto: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(authDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authDto: AuthCredentialDto,
  ): Promise<{ accessToekn: string }> {
    return this.authService.sighIn(authDto);
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() req) {
    console.log('req', req);
  }
}
