/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { ProviderCrypto } from '@fixmotor/core';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements ProviderCrypto {
  async crypto(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
  compare(password: string, passwordCrypto: string): Promise<boolean> {
    return bcrypt.compare(password, passwordCrypto);
  }
}
