import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDTO } from './dto/CreateEmployeeDTO';
import { UpdateEmployeeDTO } from './dto/UpdateEmployeeDTO';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateEmployeeDTO) {
    return this.prisma.employee.create({ data: dto as any });
  }

  findAll() {
    return this.prisma.employee.findMany();
  }

  async findOne(id: number) {
    const found = await this.prisma.employee.findUnique({ where: { id } });
    if (!found) throw new NotFoundException(`Employee ${id} not found`);
    return found;
  }

  async update(id: number, dto: UpdateEmployeeDTO) {
    await this.findOne(id);
    return this.prisma.employee.update({ where: { id }, data: dto as any });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.employee.delete({ where: { id } });
    return { deleted: true, id };
  }
}
