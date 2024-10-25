import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Movie } from "apps/movie/src/schemas/movie.schema";
import mongoose from "mongoose";

@Schema()
export class Year {
    @ApiProperty({example: 1999})
    @Prop()
    title: number

    @ApiProperty({example: 0})
    @Prop({default: 0})
    movieCount: number

    @ApiProperty({example: []})
    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}])
    movies: Movie[]
}

export const yearSchema = SchemaFactory.createForClass(Year)
