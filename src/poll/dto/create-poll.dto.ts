import { ApiProperty } from '@nestjs/swagger';

export class CreatePollDto {
  @ApiProperty()
  question: string;

  @ApiProperty()
  options: string[];
}
