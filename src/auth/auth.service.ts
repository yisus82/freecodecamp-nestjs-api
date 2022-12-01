import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDTO) {
    const hashedPassword = await argon2.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
        },
        select: {
          id: true,
          email: true,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDTO) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          email: dto.email,
        },
        select: {
          email: true,
          password: true,
          firstName: true,
          lastName: true,
        },
      });
      const passwordMatches = await argon2.verify(user.password, dto.password);
      if (!passwordMatches) {
        throw new UnauthorizedException('Invalid email or password');
      }
      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new UnauthorizedException('Invalid email or password');
        }
      }
      throw error;
    }
  }
}
