import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendService } from './attend.service';
import { AttendController } from './attend.contraoller';
import { Attend, AttendSchema } from './schema/attend.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Attend.name, schema: AttendSchema }]),
  ],
  controllers: [AttendController],
  providers: [AttendService],
})
export class AttendModule {}
