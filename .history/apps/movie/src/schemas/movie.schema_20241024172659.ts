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
    rating: number

    @Prop({default: 0})
    watches: number

    @Prop({default: 0}) 
    likes: number

    @Prop()
    watchBy: []

    @Prop()
    likeBy: []
}