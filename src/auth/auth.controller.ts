import { Controller, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // @Post('refresh')
  // async refresh(@Req() req, @Res() res ){
    
  // }



  // ToDo: Request reset password and reset password method (Repo: auth-nestjs)

}
