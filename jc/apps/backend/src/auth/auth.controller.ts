/* eslint-disable @typescript-eslint/no-unsafe-argument */ /* eslint-disable @typescript-eslint/no-unsafe-return */ /* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Controller, Post, Body, Get, Req, Res } from '@nestjs/common';
import { UserPrisma } from './user.prisma';
import { BcryptProvider } from './bcrypt.provider';
import * as jwt from 'jsonwebtoken';
import { LoginUser, SaveOfUser } from '@fixmotor/core';
import type { User } from '@fixmotor/core'; // só tipo

@Controller('auth')
export class AuthController {
  constructor(
    private readonly repo: UserPrisma,
    private readonly crypto: BcryptProvider,
  ) {}

  @Post('login')
  async login(@Body() data: { email: string; password: string }) {
    const caseUse = new LoginUser(this.repo, this.crypto);
    const user = await caseUse.execute({
      email: data.email,
      password: data.password,
    });
    const secret = process.env.JWT_SECRET ?? '';
    return jwt.sign(user, secret, { expiresIn: '3d' });
  }

  @Post('register')
  async register(@Body() user: User) {
    const caseOfUse = new SaveOfUser(this.repo, this.crypto);
    await caseOfUse.execute(user);
  }

  @Get(':email')
  async findToEmail(@Req() req: any, @Res() res: any) {
    const email = req.params.email;
    const user = await this.repo.searchToEmail(email);
    if (!user) {
      return res.status(404).send({ message: 'Utilizador não encontrado' });
    }
    return res.send(user);
  }
}
