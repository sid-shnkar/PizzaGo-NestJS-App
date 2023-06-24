import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserSchemas extends Document {
  // @Prop({ required: true })
  // name: string;
  @Prop({ required: true })
  email: string;
  // @Prop({ required: true })
  // address: string;
  // @Prop({ required: true })
  // streetAddress: string;
  @Prop({ required: true })
  password: string;
}

export const userSchema = SchemaFactory.createForClass(UserSchemas);
