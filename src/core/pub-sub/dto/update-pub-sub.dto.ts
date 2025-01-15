import { PartialType } from '@nestjs/mapped-types';
import { CreatePubSubDto } from './create-pub-sub.dto';

export class UpdatePubSubDto extends PartialType(CreatePubSubDto) {}
