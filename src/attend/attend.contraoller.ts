import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';

import { AttendService } from './attend.service';
import { CreateAttendDto, UpdateAttendDto } from './dto/attend.dto';

@Controller('attend')
export class AttendController {
  constructor(private readonly attendService: AttendService) {}

  @Post()
  async create(@Body() createAttendDto: CreateAttendDto) {
    return this.attendService.create(createAttendDto);
  }

  @Get()
  async findAll(@Query('search') search?: string) {
    return this.attendService.findAll(search);
  }

  @Get(':id')
  async findOne(@Query('name') name?: string, @Query('tel') tel?: string) {
    return this.attendService.findOne({ name, tel });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAttendDto: UpdateAttendDto,
  ) {
    return this.attendService.update(id, updateAttendDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.attendService.remove(id);
  }
}
