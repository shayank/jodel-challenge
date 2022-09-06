import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { PrismaService } from '../../../prisma/prisma.service';
import { VoteDto } from '../../dto/vote.dto';
import { PollService } from '../../poll.service';

describe('PollService Int', () => {
  let pollService: PollService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    pollService = moduleRef.get(PollService);
    prisma = moduleRef.get(PrismaService);
  });

  describe('Create Poll', () => {
    let pollId: number;
    const POLL_ITEM = {
      question: 'What is your favorite country?',
      options: ['Germany', 'Netherlands', 'Iran', 'Canada'],
    };
    const voteDto: VoteDto = {
      vote: POLL_ITEM.options[0],
    };

    const invalidVoteDto: VoteDto = {
      vote: 'Redd',
    };

    it('should create poll', async () => {
      const poll = await prisma.poll.create({
        data: {
          question: POLL_ITEM.question,
          options: POLL_ITEM.options.join(','),
        },
      });
      pollId = poll.id;
    });

    it('should create vote', async () => {
      const vote = await pollService.vote(pollId, voteDto);
      expect(vote.pollId).toBe(pollId);
      expect(vote.vote).toBe(voteDto.vote);
    });

    it('should throw InvalidVote error', async () => {
      await pollService
        .vote(pollId, invalidVoteDto)
        .then((vote) => expect(vote).toBeUndefined)
        .catch((error) => expect(error.status).toBe(400));
    });
  });
});
