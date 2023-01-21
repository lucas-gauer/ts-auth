import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getNow(): string {
    return Date().toString();
  }
}
