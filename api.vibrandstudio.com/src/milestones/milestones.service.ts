import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMilestoneDTO } from './dto/CreateMilestoneDTO';
import { UpdateMilestoneDTO } from './dto/UpdateMilestoneDTO';

/**
 * Handles CRUD operations for milestones.
 */
@Injectable()
export class MilestonesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a milestone.
   */
  create(dto: CreateMilestoneDTO) {
    return this.prisma.milestone.create({ data: dto as any });
  }

  /**
   * Returns all milestones.
   */
  findAll() {
    return this.prisma.milestone.findMany();
  }

  /**
   * Fetches a single milestone or throws when missing.
   */
  async findOne(id: number) {
    const found = await this.prisma.milestone.findUnique({ where: { id } });
    if (!found) throw new NotFoundException(`Milestone ${id} not found`);
    return found;
  }

  /**
   * Updates a milestone after verifying existence.
   */
  async update(id: number, dto: UpdateMilestoneDTO) {
    await this.findOne(id);
    return this.prisma.milestone.update({ where: { id }, data: dto as any });
  }

  /**
   * Deletes a milestone and returns a confirmation payload.
   */
  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.milestone.delete({ where: { id } });
    return { deleted: true, id };
  }
}
