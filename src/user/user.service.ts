import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel({
      passwordHash: createUserDto.password,
      ...createUserDto,
    });
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    let passwordHash: string;
    if (updateUserDto.password) {
      passwordHash = updateUserDto.password;
    }

    return this.userModel.findByIdAndUpdate(id, {
      passwordHash,
      ...updateUserDto,
    });
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
