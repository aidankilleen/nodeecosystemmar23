import { BadRequestException, Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { Member } from '@prisma/client';
import { MyJwtGuard } from 'src/my-jwt/my-jwt.guard';
import { MemberService } from './member.service';

@Controller('member')
@UseGuards(MyJwtGuard)
export class MemberController {

    private readonly logger = new Logger(MemberController.name);

    constructor(private memberService: MemberService) {
    }

    @Get()
    async getMembers(): Promise<Member[]> {
        return this.memberService.getMembers();
    }

    @Get('/:id')
    async getMember(
        @Param('id', ParseIntPipe) id: number)
        : Promise<Member> {
        return this.memberService.getMember(id);
    }
    
    @Post()
    async addMember(@Body() member: Member): Promise<any> {

        return this.memberService.addMember(member);
    }

    @Put('/:id')
    async updateMember(
        @Param('id', ParseIntPipe)id: number, 
        @Body() member:Member)
        : Promise<Member> {

        if (id != member.id) {
            throw new BadRequestException(`ids don't match`);
        }
        return this.memberService.updateMember(member);
    }

    @Delete('/:id')
    async deleteMember(@Param('id', ParseIntPipe) id: number)
        : Promise<Member> {

        return this.memberService.deleteMember(id);
    }
}
