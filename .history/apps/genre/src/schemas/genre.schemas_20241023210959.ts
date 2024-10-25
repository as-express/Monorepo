import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Genre {
    @Prop()
    title: string

    @Prop()
    movie
}