import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientTypeDTO } from './dto/CreateClientTypeDTO';
import { UpdateClientTypeDTO } from './dto/UpdateClientTypeDTO';

/**
 * Business logic for ClientType entities backed by Prisma.
 */
@Injectable()
export class ClientTypesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new client type.
   */
  create(dto: CreateClientTypeDTO) {
    return this.prisma.clientType.create({ data: dto as any, include: { clients: true } });
  }

  /**
   * Retrieves all client types with their clients.
   */
  findAll() {
    return this.prisma.clientType.findMany({ include: { clients: true } });
  }

  /**
   * Finds a client type by id or throws when missing.
   * @param id Client type identifier.
   */
  async findOne(id: number) {
    const found = await this.prisma.clientType.findUnique({ where: { id }, include: { clients: true } });
    if (!found) throw new NotFoundException(`ClientType ${id} not found`);
    return found;
  }

  /**
   * Updates a client type after verifying existence.
   */
  async update(id: number, dto: UpdateClientTypeDTO) {
    await this.findOne(id);
    return this.prisma.clientType.update({ where: { id }, data: dto as any, include: { clients: true } });
  }

  /**
   * Removes a client type and returns a confirmation payload.
   */
  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.clientType.delete({ where: { id } });
    return { deleted: true, id };
  }
}
