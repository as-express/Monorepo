import { IsNotEmpty } from "class-validator";

export class createYear {
    @IsNotEmpty()
    year: number
}