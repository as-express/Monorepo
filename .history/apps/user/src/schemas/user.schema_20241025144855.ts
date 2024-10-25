import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User extends Document {
    @Prop()
    username: string

    @Prop({unique: true, required: true})
    email: string

    @Prop({re})
    password: string
}

export const userSchema = SchemaFactory.createForClass(User)