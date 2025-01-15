import { Injectable } from '@nestjs/common';
import { CreatePubSubDto } from './dto/create-pub-sub.dto';
import { UpdatePubSubDto } from './dto/update-pub-sub.dto';

@Injectable()
export class PubSubService {
  create(createPubSubDto: CreatePubSubDto) {
    return 'This action adds a new pubSub';
  }

  findAll() {
    return `This action returns all pubSub`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pubSub`;
  }

  update(id: number, updatePubSubDto: UpdatePubSubDto) {
    return `This action updates a #${id} pubSub`;
  }

  remove(id: number) {
    return `This action removes a #${id} pubSub`;
  }
}
