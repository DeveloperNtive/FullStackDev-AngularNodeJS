import { IsNotEmpty, MaxLength } from 'class-validator';
export class NewPostDTO {
  @IsNotEmpty()
  @MaxLength(30)
  tittle: string;
  @IsNotEmpty()
  @MaxLength(300)
  message: string;
}
