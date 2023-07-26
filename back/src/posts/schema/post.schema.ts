import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({timestamps: true})
export class Post {
  @Prop()
  tittle: string;

  @Prop()
  message: string;

  @Prop()
  userId: string;

  @Prop()
  date: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
