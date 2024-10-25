import { IsNotEmpty } from "class-validator";

export class signIn {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string
}