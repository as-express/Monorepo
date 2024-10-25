import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User extends Document {
    @Prop()
    username: string

    @Prop()
    email: string

    @Prop()
    password: string
}

export const userSchema = SchemaFactory.createForClass(User)