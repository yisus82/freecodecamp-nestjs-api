import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { User as UserReq } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDTO } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/me')
  getMe(@UserReq() user: User) {
    return user;
  }

  @Patch('/')
  editUser(@UserReq('id') userID: number, @Body() dto: EditUserDTO) {
    return this.userService.editUser(userID, dto);
  }
}
