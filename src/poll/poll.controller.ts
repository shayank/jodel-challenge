import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PollService } from './poll.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { VoteDto } from './dto/vote.dto';

@Controller('poll')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Post()
  createPoll(@Body() createPollDto: CreatePollDto) {
    return this.pollService.createPoll(createPollDto);
  }

  @Get()
  getAllPoll() {
    return this.pollService.getAllPoll();
  }

  @Get(':id')
  findPollById(@Param('id') id: string) {
    return this.pollService.findPollById(+id);
  }

  @Patch(':id')
  updatePoll(@Param('id') id: string, @Body() updatePollDto: UpdatePollDto) {
    return this.pollService.updatePoll(+id, updatePollDto);
  }

  @Delete(':id')
  removePoll(@Param('id') id: string) {
    return this.pollService.removePoll(+id);
  }

  @Post(':id/vote')
  vote(@Param('id') id: string, @Body() voteDto: VoteDto) {
    return this.pollService.vote(+id, voteDto);
  }

  @Get(':id/results')
  getResults(@Param('id') id: string) {
    return this.pollService.getResults(+id);
  }
}
