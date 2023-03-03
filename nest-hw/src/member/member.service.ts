import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Member } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MemberService {

    members: Member[] = [];
    private readonly logger = new Logger(MemberService.name);

    constructor(private prismaService: PrismaService) {
    }

    async getMembers(): Promise<Member[]> {
        return this.prismaService.member.findMany();
    }

    async getMember(id: number): Promise<Member> {
        let member = await this.prismaService.member.findUnique({
            where: { id }
        });

        if (!member) {
            this.logger.error(`Member ${id} not found`);
            throw new NotFoundException(`Member ${id} not found`);
        }
        return member;
    }

    async addMember(member: Member): Promise<Member> {

        try {
            let addedMember = await this.prismaService.member.create({
                data: member
            });
            return addedMember;
    
        } catch(ex) {
            throw new BadRequestException(`Bad request`);
        }
    }

    async updateMember(member: Member): Promise<Member> {

        return this.prismaService.member.update({
            where: { 
                id: member.id
            }, 
            data: member
        })
    }

    async deleteMember(id: number): Promise<Member> {

        let member: Member;
        try {
            member = await this.prismaService.member.delete({
                where: { id }
            })
        }
        catch(ex) {
            throw new NotFoundException(` member with id ${id} not found - nothing deleted`);
        }
        return member;
    }
}
