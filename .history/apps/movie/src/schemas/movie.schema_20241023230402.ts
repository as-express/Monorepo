import { Prop, Schema } from "@nestjs/mongoose";


@Schema()
export class Movie {
    @Prop()
    title: string

    @Prop()
    image: string

    @Prop()
    description: string

    @Prop()
    rating: string

    @
}