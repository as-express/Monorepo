import { Prop, Schema } from "@nestjs/mongoose";


@Schema()
export class Movie {
    @Prop()
    title: string

    @Prop()
    avatar: string

    @Prop()
    description: string

    @Prop({default: 0})
    rating: number

    @Prop({default: 0})
    watches: number

    @Prop({default: 0}) 
    likes: number

    @Prop()
    genre: Gen

    @Prop({default: []})
    watchBy: []

    @Prop({default: []})
    likeBy: string[]
}