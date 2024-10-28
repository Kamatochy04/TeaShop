import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        favorites: true,
        stores: true,
        orders: true,
      },
    });

    return user;
  }

  async getByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        favorites: true,
        stores: true,
        orders: true,
      },
    });
  }

  async create(dto: AuthDto) {
    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: await hash(dto.password),
      },
    });
  }
}
