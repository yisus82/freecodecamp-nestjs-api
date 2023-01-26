import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDTO } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async editUser(userID: number, dto: EditUserDTO) {
    const user = await this.prisma.user.update({
      where: { id: userID },
      data: dto,
    });

    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}
