import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class Year {
    @ApiProperty({example: '1999'})
    @Prop()
    title: string

    @ApiProperty({example: 0})
    @Prop({default: 0})
    movieCount: number

    @ApiProperty({example: []})
    @Prop()
    movies: string[]
}

export const genreSchema = SchemaFactory.createForClass(Genre)
