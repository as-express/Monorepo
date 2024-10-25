import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";

@Schema()
export class Year {
    @ApiProperty({example: '1999'})
    @Prop()
    title: string

    @ApiProperty({example: 0})
    @Prop({default: 0})
    movieCount: number

    @ApiProperty({example: []})
    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'movie'}])
    movies: string[]
}

export const yearSchema = SchemaFactory.createForClass(Year)
