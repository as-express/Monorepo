import { IsNotEmpty } from "class-validator";

export class movieDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description: string

    
}