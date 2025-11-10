import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { UpdateUserDTO } from './dto/UpdateUserDTO';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDTO) {
    const data: any = { ...dto };
    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }
    return this.prisma.user.create({ data, include: { employee: true, company: true } });
  }

  findAll() {
    return this.prisma.user.findMany({ include: { employee: true, company: true } });
  }

  async findOne(id: number) {
    const found = await this.prisma.user.findUnique({ where: { id }, include: { employee: true, company: true } });
    if (!found) throw new NotFoundException(`User ${id} not found`);
    return found;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email }, include: { employee: true, company: true } });
  }

  async update(id: number, dto: UpdateUserDTO) {
    await this.findOne(id);
    const data: any = { ...dto };
    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }
    return this.prisma.user.update({ where: { id }, data, include: { employee: true, company: true } });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.user.delete({ where: { id } });
    return { deleted: true, id };
  }
}
