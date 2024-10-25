import { Prop, Schema } from "@nestjs/mongoose";
import { Genre } from "apps/genre/src/schemas/genre.schemas";
import { Year } from "apps/year/src/schemas/year.schema";
import mongoose from "mongoose";


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

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Genre'})
    genre: Genre

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Year'})
    year: Year

    @Prop({default: []})
    watchBy: []

    @Prop({default: []})
    likeBy: string[]
}