import { Controller, Get, Post } from '@nestjs/common';

@Controller('delivery')
export class DeliveryController {
  constructor() {}

  @Get()
  findAll() {}

  @Post()
  create() {}
}
