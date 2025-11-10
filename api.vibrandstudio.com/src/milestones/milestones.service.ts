import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMilestoneDTO } from './dto/CreateMilestoneDTO';
import { UpdateMilestoneDTO } from './dto/UpdateMilestoneDTO';

@Injectable()
export class MilestonesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateMilestoneDTO) {
    return this.prisma.milestone.create({ data: dto as any });
  }

  findAll() {
    return this.prisma.milestone.findMany();
  }

  async findOne(id: number) {
    const found = await this.prisma.milestone.findUnique({ where: { id } });
    if (!found) throw new NotFoundException(`Milestone ${id} not found`);
    return found;
  }

  async update(id: number, dto: UpdateMilestoneDTO) {
    await this.findOne(id);
    return this.prisma.milestone.update({ where: { id }, data: dto as any });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.milestone.delete({ where: { id } });
    return { deleted: true, id };
  }
}
