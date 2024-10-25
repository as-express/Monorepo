import { IsNotEmpty } from "class-validator";

export class signUp {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    email: string

    @
}