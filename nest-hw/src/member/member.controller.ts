import { Controller, Get } from '@nestjs/common';
import { Member } from './member.model';

@Controller('member')
export class MemberController {

    @Get()
    test(): Member {

        let m = new Member(1, "Alice", "alice@gmail.com", true);

        return m;
    }

}
