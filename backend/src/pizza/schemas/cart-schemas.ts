import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class CartSchemas extends Document {
  @Prop({ required: true })
  email: string;
  @Prop({ required: false })
  pizzaId: string;
  @Prop({ required: true })
  pizzaName: string;
  @Prop({ required: false })
  pizzaPrice: number;
  @Prop({ required: false })
  isVeg: boolean;
  @Prop({ required: true })
  quantity: number;
  @Prop({ required: false })
  totalPrice: number;
}

export const cartSchemas = SchemaFactory.createForClass(CartSchemas);
