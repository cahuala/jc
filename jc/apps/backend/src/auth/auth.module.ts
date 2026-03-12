/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DbModule } from 'src/db/db.module';
import { BcryptProvider } from './bcrypt.provider';
import { AuthMiddleware } from './auth.middleware';
import { UserPrisma } from './user.prisma';

@Module({
  imports: [DbModule],
  controllers: [AuthController],
  providers: [BcryptProvider, AuthMiddleware, UserPrisma],
  exports: [AuthMiddleware, UserPrisma],
})
export class AuthModule {}
