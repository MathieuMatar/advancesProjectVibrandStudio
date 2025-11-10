import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientTypeDTO } from './dto/CreateClientTypeDTO';
import { UpdateClientTypeDTO } from './dto/UpdateClientTypeDTO';

@Injectable()
export class ClientTypesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateClientTypeDTO) {
    return this.prisma.clientType.create({ data: dto as any, include: { clients: true } });
  }

  findAll() {
    return this.prisma.clientType.findMany({ include: { clients: true } });
  }

  async findOne(id: number) {
    const found = await this.prisma.clientType.findUnique({ where: { id }, include: { clients: true } });
    if (!found) throw new NotFoundException(`ClientType ${id} not found`);
    return found;
  }

  async update(id: number, dto: UpdateClientTypeDTO) {
    await this.findOne(id);
    return this.prisma.clientType.update({ where: { id }, data: dto as any, include: { clients: true } });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.clientType.delete({ where: { id } });
    return { deleted: true, id };
  }
}
