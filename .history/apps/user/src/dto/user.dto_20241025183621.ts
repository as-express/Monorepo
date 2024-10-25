import { IsNotEmpty } from 'class-validator';

export class userDto {
  @IsNotEmpty()
  username: string;
}
