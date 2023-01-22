import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel({
      passwordHash: createUserDto.password,
      ...createUserDto,
    });
    const { passwordHash, ...user } = (await createdUser.save()).toJSON();
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async findPasswordHash(email: string): Promise<string> {
    const user = await this.userModel
      .findOne({ email }, { passwordHash: 1 })
      .exec();
    return user.passwordHash;
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    let passwordHash: string;
    if (updateUserDto.password) {
      passwordHash = updateUserDto.password;
    }

    return this.userModel
      .findByIdAndUpdate(id, {
        passwordHash,
        ...updateUserDto,
      })
      .exec();
  }

  remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
