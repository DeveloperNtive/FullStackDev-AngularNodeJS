import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop()
  fullName: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  passWord: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
