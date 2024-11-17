import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAttendDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  tel: string;

  @IsNotEmpty()
  @IsString()
  direction: string;

  @IsNotEmpty()
  @IsString()
  boarding: string;
}

export class UpdateAttendDto {
  @IsString()
  name?: string;

  @IsString()
  tel?: string;

  @IsString()
  direction?: string;

  @IsString()
  boarding: string;
}
