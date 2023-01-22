import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from './role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: string;

  @Prop()
  email: string;

  @Prop({ select: false })
  passwordHash?: string;

  @Prop({
    required: true,
    enum: Role,
    default: Role.User,
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
