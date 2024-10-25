import { IsNotEmpty } from "class-validator";

export class createGenre {
    @IsNotEmpty()
    title: string
    
}