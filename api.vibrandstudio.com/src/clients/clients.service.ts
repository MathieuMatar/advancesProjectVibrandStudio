import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDTO } from './dto/CreateClientDTO';
import { UpdateClientDTO } from './dto/UpdateClientDTO';

/**
 * Business logic for Client entities backed by Prisma.
 */
@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a client with optional relations.
   * @param dto Data to create the client.
   */
  create(dto: CreateClientDTO) {
    return this.prisma.client.create({ data: dto as any, include: { clientType: true } });
  }

  /**
   * Lists all clients including their type.
   */
  findAll() {
    return this.prisma.client.findMany({ include: { clientType: true } });
  }

  /**
   * Finds a single client or throws when missing.
   * @param id Client identifier.
   */
  async findOne(id: number) {
    const found = await this.prisma.client.findUnique({ where: { id }, include: { clientType: true } });
    if (!found) throw new NotFoundException(`Client ${id} not found`);
    return found;
  }

  /**
   * Updates a client after ensuring it exists.
   * @param id Client identifier.
   * @param dto Partial update payload.
   */
  async update(id: number, dto: UpdateClientDTO) {
    await this.findOne(id);
    return this.prisma.client.update({ where: { id }, data: dto as any, include: { clientType: true } });
  }

  /**
   * Deletes a client and returns a confirmation payload.
   * @param id Client identifier.
   */
  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.client.delete({ where: { id } });
    return { deleted: true, id };
  }
}
