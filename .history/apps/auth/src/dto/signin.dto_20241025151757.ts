import { IsNotEmpty } from "class-validator";

export class signIn {
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string
}