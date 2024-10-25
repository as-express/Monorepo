import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Movie } from "apps/movie/src/schemas/movie.schema";

@Schema()
export class Genre {
    @ApiProperty({example: 'Fantastic'})
    @Prop()
    title: string

    @ApiProperty({example: 0})
    @Prop({default: 0})
    movieCount: number

    @ApiProperty({example: []})
    @Prop({})
    movies: Movie[]
}

export const genreSchema = SchemaFactory.createForClass(Genre)
