import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class Genre {
    @ApiProperty({example: 'Fantastic'})
    @Prop()
    title: string

    @ApiProperty({example: ''})
    @Prop({default: 0})
    movieCount: number

    @Prop()
    movies: string[]
}

export const genreSchema = SchemaFactory.createForClass(Genre)
