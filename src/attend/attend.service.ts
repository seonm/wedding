import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAttendDto, UpdateAttendDto } from './dto/attend.dto';
import { Attend } from './schema/attend.schema';

@Injectable()
export class AttendService {
  constructor(@InjectModel(Attend.name) private attendModel: Model<Attend>) {}

  // Create
  async create(createAttendDto: CreateAttendDto): Promise<Attend> {
    const newAttend = new this.attendModel(createAttendDto);
    return newAttend.save();
  }

  // Read All with Search
  async findAll(search?: string): Promise<Attend[]> {
    const query = search
      ? {
          $or: [
            { name: new RegExp(search, 'i') },
            { tel: new RegExp(search, 'i') },
          ],
        }
      : {};
    return this.attendModel.find(query).exec();
  }

  // Read One
  async findOne(id: string): Promise<Attend> {
    const attend = await this.attendModel.findById(id).exec();
    if (!attend) throw new NotFoundException('Attend not found');
    return attend;
  }

  // Update
  async update(id: string, updateAttendDto: UpdateAttendDto): Promise<Attend> {
    const updatedAttend = await this.attendModel
      .findByIdAndUpdate(id, updateAttendDto, { new: true })
      .exec();
    if (!updatedAttend) throw new NotFoundException('Attend not found');
    return updatedAttend;
  }

  // Delete
  async remove(id: string): Promise<void> {
    const result = await this.attendModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Attend not found');
  }
}
