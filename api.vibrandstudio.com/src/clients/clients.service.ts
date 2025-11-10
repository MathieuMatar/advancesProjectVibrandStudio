import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDTO } from './dto/CreateClientDTO';
import { UpdateClientDTO } from './dto/UpdateClientDTO';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateClientDTO) {
    return this.prisma.client.create({ data: dto as any, include: { clientType: true } });
  }

  findAll() {
    return this.prisma.client.findMany({ include: { clientType: true } });
  }

  async findOne(id: number) {
    const found = await this.prisma.client.findUnique({ where: { id }, include: { clientType: true } });
    if (!found) throw new NotFoundException(`Client ${id} not found`);
    return found;
  }

  async update(id: number, dto: UpdateClientDTO) {
    await this.findOne(id);
    return this.prisma.client.update({ where: { id }, data: dto as any, include: { clientType: true } });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.client.delete({ where: { id } });
    return { deleted: true, id };
  }
}
