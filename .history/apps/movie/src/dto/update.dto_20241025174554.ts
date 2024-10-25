export class movieUpdateDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
