import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDTO } from './dto/CreateTaskDTO';
import { UpdateTaskDTO } from './dto/UpdateTaskDTO';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) { }

  create(dto: CreateTaskDTO) {
    return this.prisma.task.create({ data: dto as any });
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  async findOne(id: number) {
    const found = await this.prisma.task.findUnique({ where: { id } });
    if (!found) throw new NotFoundException(`Task ${id} not found`);
    return found;
  }

  async update(id: number, dto: UpdateTaskDTO) {
    await this.findOne(id);
    return this.prisma.task.update({ where: { id }, data: dto as any });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.task.delete({ where: { id } });
    return { deleted: true, id };
  }
}
