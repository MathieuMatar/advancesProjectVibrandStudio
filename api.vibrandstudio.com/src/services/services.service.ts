import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDTO } from './dto/CreateDTO';
import { UpdateDTO } from './dto/UpdateDTO';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class ServicesService {

    constructor(private readonly prisma: PrismaService){}

    create (dto: CreateDTO){
        return this.prisma.service.create({ data: dto as any });
    }

    findAll() {
        return this.prisma.service.findMany();
    }

    async findOne(id: number){
        const found = await this.prisma.service.findUnique({ where: { id } });
        if(!found) throw new NotFoundException(`Service ${id} not found`);
        return found;
    }

    async update(id: number, dto: UpdateDTO){
        await this.findOne(id); // ensure exists
        return this.prisma.service.update({ where: { id }, data: dto as any });
    }

    async remove(id: number){
        await this.findOne(id);
        await this.prisma.service.delete({ where: { id } });
        return {deleted: true, id};
    }
}
