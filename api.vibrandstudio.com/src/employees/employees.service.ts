import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDTO } from './dto/CreateEmployeeDTO';
import { UpdateEmployeeDTO } from './dto/UpdateEmployeeDTO';

/**
 * Business logic for employee records using Prisma.
 */
@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new employee.
   */
  create(dto: CreateEmployeeDTO) {
    return this.prisma.employee.create({ data: dto as any });
  }

  /**
   * Retrieves all employees.
   */
  findAll() {
    return this.prisma.employee.findMany();
  }

  /**
   * Finds an employee by id or throws when missing.
   */
  async findOne(id: number) {
    const found = await this.prisma.employee.findUnique({ where: { id } });
    if (!found) throw new NotFoundException(`Employee ${id} not found`);
    return found;
  }

  /**
   * Updates an employee after existence check.
   */
  async update(id: number, dto: UpdateEmployeeDTO) {
    await this.findOne(id);
    return this.prisma.employee.update({ where: { id }, data: dto as any });
  }

  /**
   * Deletes an employee and returns a confirmation payload.
   */
  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.employee.delete({ where: { id } });
    return { deleted: true, id };
  }
}
