import { Prop, Schema } from "@nestjs/mongoose";


@Schema()
export class Movie {
    @Prop()
    title: string

    @Prop()
    avatar: string

    @Prop()
    description: string

    @Prop()
    rating: string

    @Prop()
    watches: number

    @Prop() 
    likes: 
}