import { ApiProperty } from '@nestjs/swagger';

export class VoteDto {
  @ApiProperty()
  vote: string;
}
