import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { VoteDto } from './dto/vote.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Vote, Poll } from '@prisma/client';

@Injectable()
export class PollService {
  constructor(private prisma: PrismaService) {}

  createPoll(createPollDto: CreatePollDto): Promise<Poll> {
    const { question, options } = createPollDto;
    return this.prisma.poll.create({
      data: {
        question,
        options: options.join(','),
      },
    });
  }

  getAllPoll() {
    return this.prisma.poll.findMany();
  }

  findPollById(id: number) {
    return this.prisma.poll.findUnique({ where: { id } });
  }

  updatePoll(id: number, updatePollDto: UpdatePollDto) {
    const { question, options } = updatePollDto;
    return this.prisma.poll.update({
      where: { id },
      data: {
        question,
        options: options.join(','),
      },
    });
  }

  removePoll(id: number) {
    return this.prisma.poll.delete({ where: { id } });
  }

  async vote(id: number, voteDto: VoteDto): Promise<Vote> {
    const poll = await this.findPollById(id);
    if (!poll.options.includes(voteDto.vote)) {
      throw new BadRequestException('InvalidVote');
    }
    return this.prisma.vote.create({
      data: {
        pollId: id,
        ...voteDto,
      },
    });
  }

  async getResults(id: number) {
    const poll = await this.prisma.poll.findUnique({ where: { id } });
    const votes = await this.prisma.vote.findMany({
      where: { pollId: id },
    });
    const resCount = votes.reduce((acc, cur) => {
      if (!acc.hasOwnProperty(cur.vote)) {
        acc[cur.vote] = 0;
      }
      acc[cur.vote]++;
      return acc;
    }, {});
    const results = poll.options.split(',').reduce((acc, cur) => {
      if (!resCount.hasOwnProperty(cur)) {
        acc[cur] = '0%';
      } else {
        acc[cur] = Math.round((resCount[cur] / votes.length) * 100) + '%';
      }
      return acc;
    }, {});
    return results;
  }
}
