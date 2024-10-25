import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop()
    username: string

    @Prop
}