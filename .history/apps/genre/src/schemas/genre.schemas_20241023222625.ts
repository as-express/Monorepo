import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Genre {
    @ApiPro
    @Prop()
    title: string

    @Prop({default: 0})
    movieCount: number

    @Prop()
    movies: string[]
}

export const genreSchema = SchemaFactory.createForClass(Genre)