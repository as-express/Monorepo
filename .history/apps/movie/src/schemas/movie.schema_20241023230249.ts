import { Prop, Schema } from "@nestjs/mongoose";


@Schema()
export class Movie {
    @Prop()
    title: string

    @Prop
}