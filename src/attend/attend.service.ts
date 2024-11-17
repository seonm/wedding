// import { Model } from 'mongoose';
// import { Injectable, Inject } from '@nestjs/common';
// // import { Cat } from './interface/cat.interface';
// import { CreateAttendDto } from './attend/dto/create-attend.dto';

// @Injectable()
// export class AttendService {
//   constructor(
//     @Inject('CAT_MODEL')
//     private catModel: Model<Cat>,
//   ) {}

//   async create(createCatDto: CreateAttendDto): Promise<Cat> {
//     const createdCat = new this.catModel(createCatDto);
//     return createdCat.save();
//   }

//   async findAll(): Promise<Cat[]> {
//     return this.catModel.find().exec();
//   }
// }

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
            { name: new RegExp(search, 'i') }, // 이름 검색 (대소문자 무시)
            { phone: new RegExp(search, 'i') }, // 전화번호 검색
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
