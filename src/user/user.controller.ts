import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { User as UserReq } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('/me')
  getMe(@UserReq() user: User) {
    return user;
  }
}
