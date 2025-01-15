import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PubSubModule } from './core/pub-sub/pub-sub.module';
import { AuthModule } from './core/auth/auth.module';

@Module({
  imports: [PubSubModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
