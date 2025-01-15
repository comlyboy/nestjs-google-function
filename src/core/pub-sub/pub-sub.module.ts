import { Module } from '@nestjs/common';
import { PubSubService } from './pub-sub.service';
import { PubSubController } from './pub-sub.controller';

@Module({
  controllers: [PubSubController],
  providers: [PubSubService],
})
export class PubSubModule {}
