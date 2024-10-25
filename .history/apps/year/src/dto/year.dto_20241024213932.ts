import { IsNotEmpty } from "class-validator";

export class yearDto {
    @IsNotEmpty()
    year: number
}