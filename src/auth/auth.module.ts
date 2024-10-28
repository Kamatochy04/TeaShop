import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/config/jwt.config';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { GoogleStrategy } from './strategis/google.strategy';
import { JwtStrategy } from './strategis/jwt.strategy';
import { YandexStrategy } from './strategis/jandex.strategy';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    UserService,
    GoogleStrategy,
    JwtStrategy,
    YandexStrategy,
  ],
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
})
export class AuthModule {}
