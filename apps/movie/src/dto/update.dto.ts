import { IsNotEmpty } from 'class-validator';

export class movieUpdateDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
