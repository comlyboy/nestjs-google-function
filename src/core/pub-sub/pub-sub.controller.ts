import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PubSubService } from './pub-sub.service';
import { CreatePubSubDto } from './dto/create-pub-sub.dto';
import { UpdatePubSubDto } from './dto/update-pub-sub.dto';

@Controller('pub-sub')
export class PubSubController {
  constructor(private readonly pubSubService: PubSubService) {}

  @Post()
  create(@Body() createPubSubDto: CreatePubSubDto) {
    return this.pubSubService.create(createPubSubDto);
  }

  @Get()
  findAll() {
    return this.pubSubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pubSubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePubSubDto: UpdatePubSubDto) {
    return this.pubSubService.update(+id, updatePubSubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pubSubService.remove(+id);
  }
}
